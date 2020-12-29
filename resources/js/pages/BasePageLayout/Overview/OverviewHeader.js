import React from 'react';

export default function OverviewHeader({ entry, showEntry, entryTypeName }) {
    return (
        <div className={`card-header${showEntry ? ' active' : ''}`}>
            <div className="row">
                <div className="col-6">
                    <p style={{ marginBottom: 0, fontSize: `${1}rem` }} className="text-uppercase m-bot-0">
                        {entry.name}
                    </p>
                </div>
                <div className="col-6 text-right">
                    <p style={{ marginBottom: 0, fontSize: `${1}rem` }} className="text-uppercase m-bot-0">
                        {entry.type}
                        {' '}
                        {entryTypeName}
                    </p>
                </div>
            </div>
        </div>
    );
}
