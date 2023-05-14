import React, { useState, useEffect } from 'react';

function App({ openai }) {
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

  return (
    <div>
      <div className='chat-list' >
        {messages.map((img, i) => (
          <img style={{ width: '250px', margin: '5px auto' }} src={img} alt={`${i}`} />
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <textarea placeholder='Put Your Image Description Here!' className='query-input' name="Text1" cols="42" rows="5" value={input} onChange={handleChange} />
        <button className='submit-msg-btn' type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
