import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Vlogo from './Vlogo.png';
import './App.css';

function App() {

  const CHAT_ROLES = {
    USER: 'user',
    ASSITANT: 'assistant',
    SYSTEM: 'system',
  }

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [botResponse, setResponse] = useState('');

  useEffect(() => {
    if (botResponse) {
      setMessages([...messages, botResponse]);
    }
  }, [botResponse])

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const message = {
      content: input,
      role: CHAT_ROLES.USER,
    };
    const messagesQueue = [...messages, message];
    setMessages(messagesQueue);
    setInput('');
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messagesQueue],
    });
    
    const botMessage = {
      content: response.data.choices[0].message.content,
      role: CHAT_ROLES.ASSITANT,
    };
    setResponse(botMessage);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='logoContainer'>
          <img src={Vlogo} alt="Vlogo" className='vlogo' />
        </div>
        <div className='chat-list'>
          {messages.map((message, index) => (
            <p key={index} className={message.role === CHAT_ROLES.USER ? 'user-message' : 'bot-message'}>
              {message.content}
            </p>
          ))}
        </div>
        <form onSubmit={handleMessageSubmit}>
          <textarea name="Text1" cols="42" rows="5" value={input} onChange={handleChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
