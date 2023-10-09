import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './App.module.css';
import { useUser } from '../../Hooks/loginHook.jsx';

const socket = io('/')

function App() {
  const { username } = useUser();
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
    setMessage('');
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
    <div className={style.chats}>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={handleInput}
          type="text"
          placeholder="Write your message"
        />
        <Button type="submit" variant="info mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </Button>
      </form>
      <ListGroup className="mb-2">
        {messages.map((message, i) => (
          <ListGroup.Item
            key={i}
            className={`mb-1 text-dark ${
              message.from !== username
                ? "text-start &&  text-secondary"
                : "text-end && text-white-50 bg-dark"
            }`}
          >
            {message.from}:{message.body}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App
