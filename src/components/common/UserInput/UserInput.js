import React, { useEffect, useState } from "react";

const UserInput = ({ ...props }) => {
    const { handleMessageSubmit, handleUserInputChange, userInput, isTyping, placeholder } = props;
    const [loadingText, setLoadingText] = useState('typing ...');

    useEffect(() => {
        if (isTyping) {
            const typingMessages = ['typing ', 'typing .', 'typing ..', 'typing ...'];
            let index = 0;

            const interval = setInterval(() => {
                setLoadingText(typingMessages[index]);
                index = (index + 1) % typingMessages.length;
            }, 500);

            return () => clearInterval(interval);
        } else {
            setLoadingText('');
        }
    }, [isTyping]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleMessageSubmit(e);
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '10px 0', fontSize: '16px', fontWeight: 'bold', height: '18px' }}>{loadingText}</p>
            <form style={{ display: 'flex', gap: '8px', width: '100%' }} onSubmit={handleMessageSubmit}>
                <textarea
                    placeholder={placeholder}
                    style={{ resize: 'none' }}
                    name="Text1"
                    cols="42"
                    rows="5"
                    value={userInput}
                    onChange={handleUserInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button style={{ width: '100px', height: '81px' }} type="submit">Send</button>
            </form>
        </div>
    );
}

export default UserInput;
