import React, { useState } from 'react';
import CustomCommandsOverviewHeader from './CustomCommandsOverviewHeader/CustomCommandsOverviewHeader';
import CustomCommandsEditor from '../../CustomCommandsEditor/CustomCommandsEditor';

export default function CustomCommandsOverview({
    activePanel,
    entry,
    setEntry,
    entries,
    deleteEntry,
    setEntries,
    showEntry,
    toggleShowEntry,
    selectedConfig,
    setEditorConfig,
    entryTypeName,
}) {
    const [staticFields, setStaticFields] = useState({
        commandPrefix: entry.static?.prefix,
        commandName: entry.static?.name,
        type: entry.type,
        role: entry.static?.role,
        roleAction: entry.static?.roleAction,
        id: entry.id,
        permissions: entry.static?.permissions,
        cooldown: entry.static?.cooldown,
        deleteCommandResponse: entry.static?.deleteCommandResponse,
        messageType: entry.static?.messageType,
        deleteCommandUsage: entry.static.deleteCommandUsage,
        displayHelp: entry.static.displayHelp,
        responseChannel: entry.static.responseChannel,
        bannedChannel: entry.static.bannedChannel,
    });

    const staticFieldsChanged = (staticFieldNewValues) => {
        setEntry({
            ...entry,
            ...staticFieldNewValues,
        });
        setStaticFields(staticFieldNewValues);
    };
    return (
        <div className="card card-smaller-radius m-top-bot-1">
            <div onClick={toggleShowEntry}>
                <CustomCommandsOverviewHeader
                    entry={staticFields}
                    showEntry={showEntry}
                    entryTypeName={entryTypeName}
                />
            </div>
            <div style={{ display: showEntry === true ? 'block' : 'none' }}>
                <div className="card-body">
                    <CustomCommandsEditor
                        activePanel={activePanel}
                        editorValues={!entry.responses.length ? [{}] : entry.responses}
                        setEditorValues={(val) => {
                            setEntry({
                                ...entry,
                                responses: val,
                            });
                        }}
                        selectedConfig={selectedConfig}
                        setEditorConfig={setEditorConfig}
                        entries={entries}
                        setEntries={setEntries}
                        deleteEntry={deleteEntry}
                        staticFields={staticFields}
                        setStaticFields={staticFieldsChanged}
                    />
                </div>
            </div>
        </div>
    );
}
