import React, { useState, useEffect } from 'react';
import { CHAT_ROLES } from '../app/Configs';

const ImageToText = ({ ...props }) => {
    const { openaiClient } = props;
    const [imageFile, setImageFile] = useState(null);
    const [textContent, setTextContent] = useState('');
    const [processedText, setProcessedText] = useState('');
    const [threadId, setThreadId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [assitantInstructions, setAssitantInstructions] = useState('');

    const VEZEETA_LABS_ASSISTANT_ID = 'asst_tj4OtCcF30c4eDLhs605CZ4p';

    useEffect(() => {
        const getList = async () => {
            const assitantInfo = await openaiClient.beta.assistants.retrieve(VEZEETA_LABS_ASSISTANT_ID);
            return assitantInfo;
        }
        if (openaiClient && !assitantInstructions) {
            getList().then(resp => {
                setAssitantInstructions(resp?.instructions);
            })
        }
    }, [openaiClient]);

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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImageFile(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };


    const getMessagesList = async () => {
        try {
            const messages = await openaiClient.beta.threads.messages.list(threadId);
            return messages;
        } catch (error) {
            console.error('Error fetching messages:', error);
            return [];
        }
    };

    const convertImageToText = async () => {
        setLoading(true);
        // Extract Text from Image
        const response = await openaiClient.chat.completions.create({
            "model": "gpt-4o",
            "messages": [
                {
                    content: "Extract Text in the image line by line and only extract scientific info",
                    role: CHAT_ROLES.SYSTEM,
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": `data:image/jpeg;base64,${imageFile}`
                            }
                        }
                    ]
                }
            ],
        });
        const content = response?.choices[0]?.message?.content;
        // Send Content to Assistant
        const newUserMessage = {
            role: CHAT_ROLES.USER,
            content: content,
        };
        try {
            console.log(threadId)
            await openaiClient.beta.threads.messages.create(threadId, newUserMessage);

            const run = await openaiClient.beta.threads.runs.createAndPoll(threadId, {
                assistant_id: VEZEETA_LABS_ASSISTANT_ID,
                instructions: assitantInstructions, 
            });

            if (run.status === 'completed') {
                getMessagesList(run).then((response) => {
                    const assitantLastResponse = response.data[0];
                    const assitantMessageContent = assitantLastResponse.content[0].text.value
                    setProcessedText(assitantMessageContent)
                });
            } else {
                console.log(run.status);
            }

        } catch (error) {
            console.error("Error sending message:", error);
        }


        setTextContent(content);
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', margin: 'auto' }}>
            <h1 style={{ margin: '0', fontSize: '18px' }}>Image to Text Converter</h1>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <div style={{ display: 'flex', gap: '15px', width: '100%', margin: 'auto' }} >
                <div style={{ width: '100% '}}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <h2 style={{ margin: '0', fontSize: '18px' }}>Selected Image:</h2>
                        <button disabled={!imagePreview} onClick={convertImageToText}>Convert</button>
                    </div>
                    {imagePreview && (<img src={imagePreview} alt="Selected" style={{ width: '400px', margin: '16px 0px' }} />)}
                </div>
                <div style={{ width: '100% '}}>
                    <h2 style={{ margin: '0', fontSize: '18px' }}>Extracted Text:</h2>
                    {isLoading && textContent && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>Extracting Text ...</p>)}
                    {!isLoading && textContent && ( 
                        <div>
                            <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>{textContent || '--'}</p>
                        </div>
                    )}

                    {isLoading && !textContent && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>Extracting Text ...</p>)}
                    {!isLoading && !textContent && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>--</p>)}

                </div>
                <div style={{ width: '100% '}}>
                    <h2 style={{ margin: '0', fontSize: '18px' }}>Mapped Values:</h2>
                    {isLoading && processedText && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>Mapping Text ...</p>)}
                    {!isLoading && processedText && ( 
                        <div>
                            <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>{processedText || '--'}</p>
                            <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>{processedText || '--'}</p>
                        </div>
                    )}

                    {isLoading && !processedText && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>Mapping Text ...</p>)}
                    {!isLoading && !processedText && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>--</p>)}

                </div>
            </div>
            
        </div>
    );
};

export default ImageToText;
