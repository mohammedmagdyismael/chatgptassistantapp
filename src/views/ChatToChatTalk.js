import React, { useState, useEffect } from 'react';
import { CHAT_ROLES } from '../app/Configs';

function App({ openai }) {
  const [roleQuery, setRoleQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [botResponse, setResponse] = useState('');

  // Set New Response
  useEffect(() => {
    if (botResponse) {
      setMessages([...messages, botResponse]);
      handleMessageSubmit(botResponse.content, botResponse.role);

    }
  }, [botResponse])

  const setMessage = async (content, role, callBack) => {
    setMessages([...messages, { content, role }]);
    await callBack(content, role);
  }

  const handleMessageSubmit = async (content, role) => {
    const copyMessageList = messages;
    if (content) {
      copyMessageList.push({content, role})
    }

    const response = await new Promise(resolve => {
      setInterval(async () => {
        const resp = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: copyMessageList,
        });
        resolve(resp);
      }, 10000)
    })

    const botMessage = {
      content: response.data.choices[0].message.content,
      role: role === CHAT_ROLES.ASSITANT ? CHAT_ROLES.USER : CHAT_ROLES.ASSITANT,
    };
    setResponse(botMessage);
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
        <div>
          <div className='role-container'>
            <input placeholder='ex: you are a call center operator in vezeeta helping user to book appointments' className='role-input' type="text" value={roleQuery} onChange={e => setRoleQuery(e.target.value)} />
            <button className='role-input-btn' onClick={() => submitRole()} type="submit">Set Role</button>
          </div>
          <button className='submit-msg-btn' onClick={() => setMessage('Hello !', CHAT_ROLES.USER, handleMessageSubmit)}>Start</button>
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
        </div>
  );
}

export default App;
