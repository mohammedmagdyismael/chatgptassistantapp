import React from "react";

const UserInput = ({ ...props }) => {
    const { handleMessageSubmit, handleUserInputChange, userInput, isTyping, placeholder } = props;

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '10px 0', fontSize: '14px', height: '18px' }}>{isTyping ? 'typing ...' : ''}</p>
          <form style={{ display: 'flex', gap: '8px', width: '100%' }} onSubmit={handleMessageSubmit}>
            <textarea placeholder={placeholder} style={{ resize: 'none' }}  name="Text1" cols="42" rows="5" value={userInput} onChange={handleUserInputChange} />
            <button style={{ width: '100px', height: '81px'  }} type="submit">Send</button>
          </form>
        </div>
    )
}

export default UserInput;
