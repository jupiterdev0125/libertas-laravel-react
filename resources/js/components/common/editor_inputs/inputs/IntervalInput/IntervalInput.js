import React, { useState } from 'react';
import './interval-input.css';

const intervalsInSeconds = [
    0, // select a value
    300, // 5 minutes
    900, // 15 minutes
    1800, // 30 minutes
    3600, // 1 hour
    14400, // 4 hours
    21600, // 6 hours
    28800, // 8 hours
    43200, // 12 hours
    86400, // 1 day
    172800, // 2 days
    259200, // 3 days
    345600, // 4 days
    432000, // 5 days
    518400, // 6 days
    604800, // 1 week
    1209600, // 2 weeks
    2592000, // 1 month (30 days)
    7776000, // 3 months (90 days)
    15552000, // 6 months (180 days)
    31536000, // 1 year
];

const convertSecondsToReadableFormat = (seconds) => {
    let secondsCopy = seconds;
    const years = Math.floor(secondsCopy / 31536000);
    if (years > 0) {
        return `${years} year${years < 2 ? ' ' : 's '}`;
    }

    secondsCopy -= years * 31536000;
    const months = Math.floor(secondsCopy / 2592000);
    if (months > 0) {
        return `${months} month${months < 2 ? ' ' : 's '}`;
    }

    secondsCopy -= months * 2592000;
    const days = Math.floor(secondsCopy / 86400);
    if (days > 0) {
        return `${days} day${days < 2 ? ' ' : 's '}`;
    }

    secondsCopy -= days * 86400;
    const hours = Math.floor(secondsCopy / 3600);
    if (hours > 0) {
        return `${hours} hour${hours < 2 ? ' ' : 's '}`;
    }

    secondsCopy -= hours * 3600;
    const minutes = Math.floor(secondsCopy / 60);
    if (minutes > 0) {
        return `${minutes} minute${minutes < 2 ? ' ' : 's '}`;
    }

    return 'Choose an interval..';
};

export default function IntervalInput({ value, setValue }) {
    const [dropdownActive, setDropdownActive] = useState(false);

    const setValueAndDisableDropdown = (x) => {
        setDropdownActive(false);
        setValue(x);
    };

    return (
        <div className="interval-dropdown no-scrollbar">
            {dropdownActive ? (
                intervalsInSeconds.map((intervalInSeconds) => (
                    <a
                        className="interval-item"
                        onClick={() => setValueAndDisableDropdown(intervalInSeconds)}
                        style={{ color: '#fff' }}
                        key={intervalInSeconds}
                    >
                        {convertSecondsToReadableFormat(intervalInSeconds)}
                    </a>
                ))
            ) : (
                <a
                    className="interval-item"
                    onClick={() => setDropdownActive(!dropdownActive)}
                    style={{ color: '#fff' }}
                >
                    {convertSecondsToReadableFormat(value || 0)}
                </a>
            )}
        </div>
    );
}
