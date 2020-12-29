import React, { useState, useContext, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import { getFetchChannels } from '../../api/moderation/configClient';
import TimedMessageSelection from '../../components/timedmessage/TimedMessageSelection/TimedMessageSelection';
import ConfigContext from '../../context/ConfigContext';
import TimedMessageEditor from '../../components/timedmessage/TimedMessageEditor/TimedMessageEditor';

export default function TimedMessage({ entries, entryTypeName }) {
    const { config } = useContext(ConfigContext);
    const [entriesState, setEntriesState] = useState(entries);
    const [activePanel, setActivePanel] = useState('');
    const [editorValues, setEditorValues] = useState([{}]);
    const [staticFields, setStaticFields] = useState({});
    const [selectedConfig, setSelectedConfig] = useState(null);

    useEffect(() => {
        (async () => {
            const channels = await getFetchChannels(config.guildId);
            config.channels = channels.data;
        })();
    }, []);

    const setEditorConfig = (config) => {
        if (config) {
            setActivePanel(config.type);
        } else {
            setActivePanel(null);
        }
        setSelectedConfig(config);
        setEditorValues([{}]);
        setStaticFields({});
    };

    return (
        <div className="container m-bot-4">
            <PageHeader config={config} pageTitle="Timed Message" pageType="timed-message" />
            <TimedMessageSelection activePanelChangedListener={setEditorConfig} />
            <TimedMessageEditor
                activePanel={activePanel}
                editorValues={editorValues}
                setEditorValues={setEditorValues}
                selectedConfig={selectedConfig}
                setEditorConfig={setEditorConfig}
                entries={entriesState}
                setEntries={setEntriesState}
                staticFields={staticFields}
                setStaticFields={setStaticFields}
            />
        </div>
    )
};