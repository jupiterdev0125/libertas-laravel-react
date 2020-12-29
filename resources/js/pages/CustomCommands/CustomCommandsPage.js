import React, { useContext, useState, useEffect } from 'react';
import CustomCommandsSelection from '../../components/customcommands/CustomCommandsSelections/CustomCommandsSelection';
import CustomCommandsPageOverview
    from '../../components/customcommands/CustomCommandsPageOverview/CustomCommandsPageOverview';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import CustomCommandsEditor from '../../components/customcommands/CustomCommandsEditor/CustomCommandsEditor';
import { getFetchChannels } from '../../api/moderation/configClient';
import { useRoles } from '../../customHooks/useRoles';
import ConfigContext from '../../context/ConfigContext';
import { COOLDOWN_FIELD, DISPLAY_HELP_FIELD } from '../../utils/configs/fieldConfigs';

const CustomCommandsPage = ({
    entries,
    entryTypeName,
}) => {
    const { config } = useContext(ConfigContext);
    const [roles] = useRoles(config.guildId);
    const [entriesState, setEntriesState] = useState(entries);
    const [activePanel, setActivePanel] = useState('');
    const [editorValues, setEditorValues] = useState([{}]);
    const [staticFields, setStaticFields] = useState({});
    const [selectedConfig, setSelectedConfig] = useState(null);
    config.roles = roles;

    useEffect(() => {
        (async () => {
            const channels = await getFetchChannels(config.guildId);
            config.channels = channels.data;
        })();
    }, []);

    const setEditorConfig = (newConfig) => {
        if (newConfig) {
            setActivePanel(newConfig.type);
        } else {
            setActivePanel(null);
        }
        setSelectedConfig(newConfig);
        setEditorValues([{}]);
        setStaticFields({
            messageType: ['server_message'],
            commandPrefix: '!',
            roleAction: true,
            displayHelp: DISPLAY_HELP_FIELD.options[1],
            cooldown: {
                cooldown: COOLDOWN_FIELD.options[0],
            },
        });
    };

    return (
        <>
            {/* <Provider store={}> */}
            <div className="container m-bot-4">
                <PageHeader pageType="custom-commands" pageTitle="Custom Commands" />
                <CustomCommandsSelection activePanelChangedListener={setEditorConfig} />
                <CustomCommandsEditor
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
                <CustomCommandsPageOverview
                    activePanel={activePanel}
                    editorValues={editorValues}
                    setEditorValues={setEditorValues}
                    selectedConfig={selectedConfig}
                    setEditorConfig={setEditorConfig}
                    entries={entriesState}
                    setEntries={setEntriesState}
                    entryTypeName={entryTypeName}
                    overviewTitle="Custom Commands"
                />
            </div>
            {/* </Provider> */}
        </>
    );
};

export default CustomCommandsPage;
