import React from 'react';
import classnames from 'classnames';

export default function WritingShortcuts({ light = false }) {
    const selectedClass = classnames('legend-text', {
        'single-channel-select-light-background': light,
    });
    return (
        <div className="container mb-3">
            <div className="row d-flex align-items-center mb-1">
                <span className={selectedClass}>{'{user.mention}'}</span>
                <small className="legend-small"> = New User Mention </small>
            </div>
            <div className="row d-flex align-items-center mb-1">
                <span className={selectedClass}>{'<@USER_ID>'}</span>
                <small className="legend-small"> = Specific User Mention </small>
            </div>
            <div className="row d-flex align-items-center mb-1">
                <span className={selectedClass}>{'<@!USER_ID>'}</span>
                <small className="legend-small"> = Nickname User Mention </small>
            </div>
            <div className="row d-flex align-items-center mb-1">
                <span className={selectedClass}>{'<@&ROLE_ID>'}</span>
                <small className="legend-small"> = Role Mention </small>
            </div>
            <div className="row d-flex align-items-center">
                <span className={selectedClass}>{'<#CHANNEL_ID>'}</span>
                <small className="legend-small"> = Channel Mention </small>
            </div>
        </div>
    );
}
