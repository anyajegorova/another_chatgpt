import { useState, useEffect } from 'react'

import './App.css'
import User from './assets/Usersvg';
import Robot from './assets/Assistantsvg'

function App() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatTitle, setChatTitle] = useState(null);


  const createNewChat = () => {
    setMessage(null),
      setChatTitle(null),
      setValue('')
  }
  /*Opening existing chats*/
  const handleClick = (uniqueTitle) => {
    setChatTitle(uniqueTitle),
      setMessage(null),
      setValue('')
  }

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json();
      console.log(data)
      setMessage(data.choices[0].message);

    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    if (!chatTitle && value && message) {
      setChatTitle(value)
    }
    if (chatTitle && value && message) {
      setChats(chats => (
        [...chats,
        {
          title: chatTitle,
          role: 'user',
          content: value
        },
        {
          role: message.role,
          content: message.content,
          title: chatTitle
        }]
      ))
    }

  }, [message, chatTitle])

  const currentChat = chats.filter(chat => chat.title === chatTitle);
  //Getting unique titles from the object
  const uniqueTitle = Array.from(new Set(chats.map(chats => chats.title)));

  return (
    <div className='app'>
      <section className='sidebar'>
        <button onClick={createNewChat}>New Chat</button>
        <ul className='history'>
          {uniqueTitle?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by Anna Jegorova</p>
        </nav>
      </section>
      <section className='main'>
        {!chatTitle && <h1>New Chat</h1>}
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => <li key={index} className={chatMessage.role}>

            <p className='role'> {chatMessage.role === 'user' ? (<User />) : (<Robot />)}</p>
            <p id='content'> {chatMessage.content} </p>

          </li>)}
        </ul>
        <div className='bottomSection'>
          <div className='inputContainer'>
            <input value={value} onChange={(e) => { setValue(e.target.value) }} />
            <div id='submit' onClick={getMessages}>➤</div>
          </div>
          <p className='info'>
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
