import React, { useState } from 'react';
import { CHAT_ROLES } from '../app/Configs';

const ImageToText = ({ ...props }) => {
    const { openaiClient } = props;
    const [imageFile, setImageFile] = useState(null);
    const [textContent, setTextContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setLoading] = useState(false)


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

    const convertImageToText = async () => {
        setLoading(true);
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
        setTextContent(content);
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '840px', margin: 'auto' }}>
            <h1 style={{ margin: '0', fontSize: '18px' }}>Image to Text Converter</h1>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <div style={{ display: 'flex', gap: '15px', width: '840px', margin: 'auto' }} >
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
                    {!isLoading && textContent && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>{textContent || '--'}</p>)}

                    {isLoading && !textContent && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>Extracting Text ...</p>)}
                    {!isLoading && !textContent && ( <p style={{ wordWrap: 'break-word',  whiteSpace: 'pre-wrap' }}>--</p>)}

                </div>
            </div>
            
        </div>
    );
};

export default ImageToText;
