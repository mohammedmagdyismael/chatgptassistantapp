import React, { useState, useEffect } from 'react';
import { CHAT_ROLES } from '../app/Configs';

function App({ openai }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [botResponse, setResponse] = useState([]);

  const scrollDownChatList = () =>  {
    setTimeout(() => {
      const scrollableDiv = document.getElementsByClassName("chat-list")[0];
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }, 500);
  }

  useEffect(() => {
    if (botResponse) {
      setMessages([...messages, ...botResponse]);
    }
    scrollDownChatList();
  }, [botResponse])



  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const message = {
      content: `Classify the following reviews and score them #: \n${input}`,
      role: CHAT_ROLES.USER,
    };
    const messagesQueue = [...messages, message];
    setMessages(messagesQueue);
    setInput('');
    scrollDownChatList();
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messagesQueue],
    });

    const botMessage =[{
      content: response.data.choices[0].message.content,
      role: CHAT_ROLES.ASSITANT,
    }];
    setResponse(botMessage);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
        <div>
          <div>
          <div className='chat-list'>
            {messages.map((message, index) => {
              if (message.role !== CHAT_ROLES.SYSTEM && message.content) {
                return (
                  <div key={index}>
                    <p className={message.role === CHAT_ROLES.USER ? 'role-user' : 'role-assistant'}>
                      {message.role}
                    </p>
                    <p className={`${message.role}-message`}>
                      {message.content}
                    </p>
                  </div>
                )
              }
              return '';
              })}
          </div>
          <form onSubmit={handleMessageSubmit}>
            <textarea placeholder='Put Your Reviews Here!' className='query-input' name="Text1" cols="42" rows="5" value={input} onChange={handleChange} />
            <button className='submit-msg-btn' type="submit">Send</button>
          </form>
          </div>
        </div>
  );
}

export default App;
