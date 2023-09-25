
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';



const socket = io('/')

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])


  const handleSubmit = (event) =>{
    event.preventDefault()
    const newMessage = {
      body: message,
      from: 'Me' 
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
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

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <input onChange={handleInput} type='text' placeholder='Write your message' />
        <Button type="submit" variant="light">
          send
        </Button>
      </form>
      <ListGroup>
        {
          messages.map((message, i) =>
            <ListGroup.Item key={i}>{message.from}:{message.body}</ListGroup.Item>
          )
        }
      </ListGroup>
    </div>
  )
}

export default App