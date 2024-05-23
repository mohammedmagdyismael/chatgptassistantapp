import React, { useEffect, useState } from "react";
import { defaultModel } from '../Helpers/Models';

const Models = ({ ...props }) => {
    const { client, onChangeModel } = props;
    const [modelsList, setModelsList] = useState([]);
    const [selectedModel, setSelectedModels] = useState('');
    
    useEffect(() => {
        const getList = async () => {
            const list = await client.models.list();
            return list || [];
        }
        if (client && !(modelsList.length)) {
            getList().then(resp => {
                const { data } = resp;
                const modelsList = data?.map(model => model.id);
                setModelsList(['Default Image Generation', ...modelsList]);
                setSelectedModels(defaultModel)
                if (onChangeModel) onChangeModel(defaultModel)
            })
        }
    }, [client]);

    const onChangeModelSelection = e => {
        const modelName = e.target.value;
        if (onChangeModel) {
            onChangeModel(modelName)
        }
        setSelectedModels(modelName)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <label style={{ minWidth: '190px' }} for="gpt-models">Choose a GPT model:</label>
            {modelsList?.length > 0 && (
                <select style={{ width: '100%' }} name="models" id="gpt-models_list" value={selectedModel} onChange={onChangeModelSelection}>
                    {modelsList.map(model => <option value={`${model}`}>{model}</option>)}
                </select>
            )}
            <div style={{ minWidth: '115px', textAlign: 'center' }} id="models-hyberlink">
                <a href="https://platform.openai.com/docs/models" target="_blank" rel="noreferrer">About Models</a>
            </div>
        </div>
    )
}

export default Models;
