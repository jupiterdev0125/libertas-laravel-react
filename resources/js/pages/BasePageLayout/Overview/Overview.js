import React from 'react';
import OverviewHeader from './OverviewHeader';
import OverviewBody from './OverviewBody';

export default function Overview({
    entry,
    setEntry,
    deleteEntry,
    config,
    showEntry,
    toggleShowEntry,
    validators,
    pageType,
    entryTypeName,
}) {
    return (
        <div className="card card-smaller-radius m-top-bot-1">
            <div onClick={toggleShowEntry}>
                <OverviewHeader entry={entry} showEntry={showEntry} entryTypeName={entryTypeName} />
            </div>
            <div style={{ display: showEntry === true ? 'block' : 'none' }}>
                <OverviewBody
                    validators={validators}
                    entry={entry}
                    setEntry={setEntry}
                    config={config}
                    deleteEntry={deleteEntry}
                    pageType={pageType}
                />
            </div>
        </div>
    );
}
