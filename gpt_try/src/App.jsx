import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello, how are you?'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json();
      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='app'>
      <section className='sidebar'>
        <button>New Chat</button>
        <ul className='history'>
          <li>First</li>
        </ul>
        <nav>
          <p>Made by Anna Jegorova</p>
        </nav>
      </section>
      <section className='main'>
        <h1>ChatGPT</h1>
        <ul className='feed'>

        </ul>
        <div className='bottomSection'>
          <div className='inputContainer'>
            <input />
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
