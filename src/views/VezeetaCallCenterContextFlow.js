import React, { useState, useEffect } from 'react';
import { CHAT_ROLES } from '../app/Configs';
import { dialogAnalysis } from '../ChatAssistants/ChatTemplateAnalysis';

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

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    let messagesQueue = [];
    if (input) {
      const message = {
        content: input,
        role: CHAT_ROLES.USER,
      };
      messagesQueue = [...messages, message];
    }else {
      messagesQueue = [...messages];
    }

    setMessages(messagesQueue);
    setInput('');
    scrollDownChatList();
    const response = await dialogAnalysis(messagesQueue)

    const botMessage = {
      content: response,
      role: CHAT_ROLES.ASSITANT,
    };
    setResponse(botMessage);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
      <div>
        <div className='chat-list'>
          {messages.map((message, index) => {
            if (message.role !== CHAT_ROLES.SYSTEM) {
              return (
                <div key={index}>
                  <p className={message.role === CHAT_ROLES.USER ? 'role-user' : 'role-assistant'}>
                    {message.role}
                  </p>
                  <p className={message.role === CHAT_ROLES.USER ? 'user-message' : 'assistant-message'}>
                    {message.content}
                  </p>
                </div>
              )
            }
            return '';
            })}
        </div>
        <form onSubmit={handleMessageSubmit}>
          <textarea className='query-input' name="Text1" cols="42" rows="5" value={input} onChange={handleChange} />
          <button className='submit-msg-btn' type="submit">Send</button>
        </form>
      </div>
  );
}

export default App;
