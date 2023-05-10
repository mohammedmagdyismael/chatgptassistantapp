import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { OpenAIApiKey } from './Configs';
import Vlogo from './Vlogo.png';
import OpenAILogo from './openaiLogo.png';
import './App.css';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [botResponse, setResponse] = useState('');

  const scrollDownChatList = () =>  {
    setTimeout(() => {
      const scrollableDiv = document.getElementsByClassName("chat-list")[0];
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }, 500);
  }

  useEffect(() => {
    if (botResponse) {
      setMessages([...messages, botResponse]);
    }
    scrollDownChatList();
  }, [botResponse])

  const configuration = new Configuration({
    apiKey: OpenAIApiKey,
  });
  const openai = new OpenAIApi(configuration);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    scrollDownChatList();
    const response = await openai.createImage({
      prompt: `${input}`,
      n: 1,
      size: "1024x1024",
    });
    
    setResponse(response?.data?.data[0].url);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  console.log(messages)
  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='logoContainer'>
          <img src={Vlogo} alt="Vlogo" className='vlogo' />
          <img src={OpenAILogo} alt="OpenAILogo" className='openailogo' />
        </div>
        <div className='chat-list' >
          {messages.map((img, i) => (
            <img style={{ width: '250px', margin: '5px auto' }} src={img} alt={`${i}`} />
          ))}
        </div>
        <form onSubmit={handleMessageSubmit}>
          <textarea className='query-input' name="Text1" cols="42" rows="5" value={input} onChange={handleChange} />
          <button className='submit-msg-btn' type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
