import React, { useContext, useState } from 'react';
import ConfigContext from '../../../context/ConfigContext';
import { ajaxPost } from '../../../utils/FetchWrapper/FetchWrapper';
import CustomCommandsOverview from './CustomCommandsOverview/CustomCommandsOverview';

export default function CustomCommandsPageOverview({
    activePanel,
    selectedConfig,
    setEditorConfig,
    entries,
    setEntries,
    overviewTitle,
    entryTypeName,
}) {
    const { config } = useContext(ConfigContext);
    const [showIndex, _setShowIndex] = useState(undefined);

    const setShowIndex = (index) => {
        if (showIndex === index) {
            _setShowIndex(undefined);
        } else {
            _setShowIndex(index);
        }
    };

    const setEntry = (index, value) => {
        const clone = [...entries];
        clone[index] = value;
        setEntries(clone);
    };

    const deleteEntry = (entryId) => {
        const formData = new FormData();
        formData.set('_method', 'DELETE');
        formData.set('id', entryId);
        ajaxPost(`/api/plugins/${config.guildId}/custom-commands/${entryId}`, config.csrfToken, formData).then(
            () => {
                setEntries(entries.filter((entry) => entry.id !== entryId));
            },
        );
    };

    return (
        <>
            {entries?.length > 0 ? (
                <div>
                    <h1 className="text-uppercase" style={{ fontWeight: 600 }}>
                        {overviewTitle}
                    </h1>
                </div>
            ) : null}
            <div className="row">
                <div className="col-12">
                    {entries
                        .sort((entA, entB) => entA.static?.name < entB.static?.name)
                        .map((entry, i) => (
                            <CustomCommandsOverview
                                key={entry.id}
                                activePanel={activePanel}
                                entry={entry}
                                setEntry={(value) => setEntry(i, value)}
                                entries={entries}
                                setEntries={setEntries}
                                selectedConfig={selectedConfig}
                                setEditorConfig={setEditorConfig}
                                deleteEntry={() => deleteEntry(entry.id)}
                                showEntry={i === showIndex}
                                toggleShowEntry={() => setShowIndex(i)}
                                entryTypeName={entryTypeName}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}
