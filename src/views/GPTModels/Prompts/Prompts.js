import React, { useEffect, useState } from "react";
import { promptsList } from './PromptsList';


const Prompts = ({ ...props }) => {
    const { onChangePrompt, systemPrompt, isDisabled } = props;
    const [selectedPrompt, setSelectedPrompt] = useState(promptsList[0]);

    useEffect(() => {
        onChangePrompt(promptsList[0].prompt);
    }, []);
    
    const onChangePromptSelection = e => {
        const selectedPrompt = promptsList.filter(prompt => prompt.id === e.target.value);
        setSelectedPrompt(selectedPrompt[0]);
        onChangePrompt(selectedPrompt[0].prompt);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div id='prompts_list' style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <label style={{ minWidth: '190px' }} for="gpt-models">Choose a System Prompt:</label>
                {promptsList?.length > 0 && (
                    <select style={{ width: '100%' }} name="models" id="gpt-models_list" value={selectedPrompt?.id} onChange={onChangePromptSelection}>
                        {promptsList.map(prompt => <option value={`${prompt.id}`}>{prompt.name}</option>)}
                    </select>
                )}
            </div>
            <div className='prompt_customed' style={{ width: '100%', display: 'flex' }}>
                <textarea
                    disabled={!(selectedPrompt.id === 'PROMPT_0') || isDisabled}
                    cols="42"
                    rows="5"
                    placeholder={`${selectedPrompt.prompt || 'Write Your Prompt'}`}
                    type="text"
                    value={systemPrompt}
                    onChange={e => onChangePrompt(e.target.value)}
                    style={{ resize: 'none' }}
                    />
            </div>
        </div>
    )
}

export default Prompts;
