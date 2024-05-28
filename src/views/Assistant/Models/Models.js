import React, { useEffect, useState } from "react";

const Models = ({ ...props }) => {
    const { client, onChangeAssistant } = props;
    const [assistantsList, setAssistantsList] = useState([]);
    const [selectedAssistant, setSelectedAssistant] = useState({});
    
    useEffect(() => {
        const getList = async () => {
            const existingAssistants = await client.beta.assistants.list();
            return existingAssistants || [];
        }
        if (client && !(assistantsList.length)) {
            getList().then(resp => {
                const { data } = resp;
                setAssistantsList([...data]);
                setSelectedAssistant(data[0])
                if (onChangeAssistant) onChangeAssistant(data[0])
            })
        }
    }, [client]);

    const onChangeModelSelection = e => {
        console.log(e.target.value)
        const assistantId = e.target.value;
        const assistantObj = assistantsList.filter(assistant => assistant.id === assistantId);
        if (onChangeAssistant) {
            onChangeAssistant(assistantObj[0])
        }
        setSelectedAssistant(assistantObj[0])
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <label style={{ minWidth: '190px' }} for="gpt-models">Choose an Assistant:</label>
            {assistantsList?.length > 0 && (
                <select style={{ width: '100%' }} name="models" id="gpt-models_list" value={selectedAssistant.id} onChange={onChangeModelSelection}>
                    {assistantsList.map(model => <option value={`${model.id}`}>{model.name}</option>)}
                </select>
            )}
        </div>
    )
}

export default Models;
