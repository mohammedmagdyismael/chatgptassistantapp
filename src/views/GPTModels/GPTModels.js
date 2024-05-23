import React, { useEffect, useState } from "react";
import { CHAT_ROLES } from '../../app/Configs';
import { disableAppendingSystemPromptModels } from './Helpers/SystemPrompt';
import { imageGenerationModels } from './Helpers/Models';
import Models from "./Models";
import Prompts from "./Prompts";
import Conversation from "./Conversation";
import UserInput from '../../components/common/UserInput';


const GPTModels = ({...props}) => {
    const { openaiClient } = props;
    const [modelName, setModelName] = useState('');
    const [userMessageInput, setUserMessageInput] = useState('');
    const [lastGPTMessageResponse, setLastGPTMessageResponse] = useState('');
    const [systemPrompt, setSystemPrompt] = useState(null);
    const [messagesQ, setMessagesQ] = useState([]);

    const scrollDownChatList = () =>  {
        setTimeout(() => {
          const scrollableDiv = document.getElementsByClassName("chat-list")[0];
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }, 500);
    }

    const isAppendingSystemtPromptDisabled = disableAppendingSystemPromptModels.includes(modelName);
    const isImageGenerationModel = imageGenerationModels.includes(modelName);

    useEffect(() => {
        setMessagesQ([{
            content: systemPrompt,
            role: CHAT_ROLES.SYSTEM,
        }]);
    }, [systemPrompt]);

    useEffect(() => {
        if (lastGPTMessageResponse) {
            setMessagesQ([...messagesQ, lastGPTMessageResponse]);
          }
          scrollDownChatList();
    }, [lastGPTMessageResponse]);

    const onUserMessageChange = e => {
        setUserMessageInput(e.target.value);
    }

    const onUserMessageSubmit = async (event) => {
        event.preventDefault();
        const userMessage = userMessageInput.trim();
        const newMessage = {
            content: userMessage,
            role: CHAT_ROLES.USER,
        };
        const fullMessagesQueue = [...messagesQ, newMessage];
        setMessagesQ(fullMessagesQueue);
        setUserMessageInput('');
        scrollDownChatList();

        if (!isImageGenerationModel) {
            const response = await openaiClient.chat.completions.create({
                model: modelName,
                messages: [...fullMessagesQueue],
            });
    
            const newGPTMessageResponse = {
                content: response.choices[0].message.content,
                role: CHAT_ROLES.ASSITANT,
            };
            setLastGPTMessageResponse(newGPTMessageResponse);    
        } else {
            const generationPayload = {
                model: modelName,
                prompt: `${userMessage}`,
                n: 1,
                size: "1024x1024",
              };
            if (modelName === 'Default Image Generation') {
                delete generationPayload.model;
            }
            const response = await openaiClient.images.generate(generationPayload);
    
            const newGPTMessageResponse = {
                content: response?.data[0].url,
                role: CHAT_ROLES.ASSITANT,
            };
            setLastGPTMessageResponse(newGPTMessageResponse);
        }

    }


    return (
        <div style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div id='models-section'>
                <Models client={openaiClient} onChangeModel={setModelName} />
            </div>
            <div id='system-prompts-section'>
                <Prompts onChangePrompt={setSystemPrompt} systemPrompt={systemPrompt} isDisabled={isAppendingSystemtPromptDisabled} />
            </div>
            <div id='conversation-section' style={{ height: 'calc(100vh - 390px)' }}>
                <Conversation messages={messagesQ} isImageGenerationModel={isImageGenerationModel} />
            </div>
            <div id='user-input-section'>
                <UserInput
                    handleMessageSubmit={onUserMessageSubmit}
                    handleUserInputChange={onUserMessageChange}
                    userInput={userMessageInput}
                    messages={messagesQ}
                    isTyping={messagesQ?.length && messagesQ[messagesQ.length - 1].role === CHAT_ROLES.USER}
                />
            </div>
        </div>
    );
}

export default GPTModels;
