import React, { Fragment, useState } from 'react';
import { ajaxPost } from '../../utils/FetchWrapper/FetchWrapper';
import Overview from './Overview/Overview';

export default function BasePageOverview({
    entries,
    setEntries,
    config,
    validators,
    pageType,
    overviewTitle,
    entryTypeName,
}) {
    const [showIndex, _setShowIndex] = useState(undefined);

    const setShowIndex = (index) => {
        if (showIndex === index) {
            _setShowIndex(undefined);
        } else {
            _setShowIndex(index);
        }
    };

    const deleteEntry = (entryId) => {
        const formData = new FormData();
        formData.set('_method', 'DELETE');
        formData.set('id', entryId);
        ajaxPost(`/api/plugins/${config.guildId}/${pageType}/${entryId}`, config.csrfToken, formData).then(
            () => {
                setEntries(entries.filter((entry) => entry.id !== entryId));
            },
        );
    };

    const setEntry = (index, value) => {
        const clone = [...entries];
        clone[index] = value;
        setEntries(clone);
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
                    {entries.sort((entA, entB) => entA.responses[0].commandName < entB.responses[0].commandName).map((entry, i) => (
                        <Overview
                            key={entry.id}
                            validators={validators}
                            entry={entry}
                            setEntry={(value) => setEntry(i, value)}
                            deleteEntry={() => deleteEntry(entry.id)}
                            config={config}
                            showEntry={i === showIndex}
                            toggleShowEntry={() => setShowIndex(i)}
                            pageType={pageType}
                            entryTypeName={entryTypeName}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
