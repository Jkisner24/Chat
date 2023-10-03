
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './App.module.css';
import userLogin from '../../Hooks/loginHook.jsx';

const socket = io('/')

function App() {
  const { username } = userLogin()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])


  const handleSubmit = (event) =>{
    event.preventDefault()
    const newMessage = {
      body: message,
      from: username, 
    }
    setMessages([...messages, newMessage])
    socket.emit('message', newMessage)
  }

  useEffect(()=>{
    socket.on('message', receiveMessage)

    return () =>{
      socket.off('message', receiveMessage)
    }
  }, [])

  const handleInput = (event) => {
    setMessage(event.target.value)
  }

  const receiveMessage = (message) =>{
    setMessages((state)=> {
      return [...state, message]
    })
  }

  return(
    <div className={style.chats} >
      <form onSubmit={handleSubmit} > 
        <input onChange={handleInput} type='text' placeholder='Write your message' />
        <Button type="submit" variant="info mt-1">
          send
        </Button>
      </form>
      <ListGroup className='mb-2'>
        {
          messages.map((message, i) =>
            <ListGroup.Item 
              key={i} 
              className={`mb-1 text-dark ${message.from === 'Me' ? 'text-start &&  text-secondary' : 'text-end && text-white-50 bg-dark'}`}
            >
            {message.from}:{message.body}</ListGroup.Item>
          )
        }
      </ListGroup>
    </div>
  )
}

export default App