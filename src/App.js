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
  const [roleQuery, setRoleQuery] = useState('');

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


  const submitRole = () => {
    if (roleQuery) {
      setMessages([{
        content: roleQuery,
        role: CHAT_ROLES.SYSTEM,
      }])
    } else {
      setMessages([])
    }
  };



  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='logoContainer'>
          <img src={Vlogo} alt="Vlogo" className='vlogo' />
        </div>
        <div className='role-container'>
          <input placeholder='ex: you are a call center operator in vezeeta helping user to book appointments' className='role-input' type="text" value={roleQuery} onChange={e => setRoleQuery(e.target.value)} />
          <button onClick={() => submitRole()} type="submit">Set Role</button>
        </div>
        <div className='chat-list'>
          {messages.map((message, index) => {
            if (message.role !== CHAT_ROLES.SYSTEM) {
              return (
                <div key={index}>
                  <p className={message.role === CHAT_ROLES.USER ? 'role-user' : 'role-assistant'}>
                    {message.role}
                  </p>
                  <p className={message.role === CHAT_ROLES.USER ? 'user-message' : 'bot-message'}>
                    {message.content}
                  </p>
                </div>
              )
            }
            return '';
            })}
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
