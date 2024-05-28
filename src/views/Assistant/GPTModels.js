import React, { useEffect, useState } from "react";
import { CHAT_ROLES } from '../../app/Configs';
import Models from "./Models";
import Conversation from "./Conversation";
import UserInput from '../../components/common/UserInput';

const GPTModels = ({ openaiClient }) => {
    const [assistant, setAssistant] = useState('');
    const [userMessageInput, setUserMessageInput] = useState('');
    const [threadId, setThreadId] = useState(null);
    const [messagesQ, setMessagesQ] = useState([]);
    const [runObj, setRunObj] = useState({});

    const scrollDownChatList = () => {
        setTimeout(() => {
            const scrollableDiv = document.getElementsByClassName("chat-list")[0];
            if (scrollableDiv) {
                scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
            }
        }, 500);
    };

    const createThread = async () => {
        try {
            const thread = await openaiClient.beta.threads.create();
            setThreadId(thread.id);
        } catch (error) {
            console.error("Error creating thread:", error);
        }
    };

    useEffect(() => {
        createThread();
    }, []);

    const onUserMessageChange = (e) => {
        setUserMessageInput(e.target.value);
    };

    useEffect(() => {
        const getMessagesList = async () => {
            try {
                const messages = await openaiClient.beta.threads.messages.list(runObj.thread_id);
                return messages;
            } catch (error) {
                console.error('Error fetching messages:', error);
                return [];
            }
        };

        if (runObj.status === 'completed') {
            getMessagesList().then((response) => {
                const messagesList = response.data.reverse().map((message) => ({
                    content: message.content[0].text.value,
                    role: message.role,
                }));
                setMessagesQ([...messagesList]);
                scrollDownChatList();
            });
        } else {
            console.log(runObj.status);
        }
    }, [runObj, openaiClient.beta.threads.messages]);

    const onUserMessageSubmit = async (event) => {
        event.preventDefault();
        const newUserMessage = {
            role: CHAT_ROLES.USER,
            content: userMessageInput,
        };
        try {
            await openaiClient.beta.threads.messages.create(threadId, newUserMessage);
            setMessagesQ((prevMessages) => [...prevMessages, newUserMessage]);
            setUserMessageInput('');

            const run = await openaiClient.beta.threads.runs.createAndPoll(threadId, {
                assistant_id: assistant.id,
                instructions: assistant.instructions,
            });
            setRunObj(run);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div id="models-section">
                <Models client={openaiClient} onChangeAssistant={setAssistant} />
            </div>   
            {threadId ? (
                <div>
                    <div id="conversation-section" style={{ height: 'calc(100vh - 270px)' }}>
                        <Conversation messages={messagesQ} />
                    </div>
                    <div id="user-input-section">
                        <UserInput
                            handleMessageSubmit={onUserMessageSubmit}
                            handleUserInputChange={onUserMessageChange}
                            userInput={userMessageInput}
                            messages={messagesQ}
                            isTyping={messagesQ.length && messagesQ[messagesQ.length - 1].role === CHAT_ROLES.USER}
                        />
                    </div>
                </div>
            ) : (
                <div style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ textAlign: 'center' }}>Creating new thread ...</p>
                </div>
            )}
        </div>
    );
};

export default GPTModels;
