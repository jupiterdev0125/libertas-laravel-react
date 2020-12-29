import React, { useState } from 'react';
import LoadingIndicator from '../../../../LoadingIndicator/LoadingIndicator';
import './channel-dropdown.css';

export default function ChannelDropdown({ channel, setChannel, selectableChannels }) {
    const [filter, setFilter] = useState('');

    const getSelectableChannels = () => {
        if (filter === '') {
            return selectableChannels;
        }

        return selectableChannels.filter((selectableChannel) => selectableChannel.name.toLowerCase().startsWith(filter.toLowerCase()));
    };

    if (undefined === selectableChannels) {
        return (
            <div className="card channel-dropdown">
                <LoadingIndicator isLoaded={false} />
            </div>
        );
    }

    return (
        <div>
            <input
                type="text"
                className="form-control"
                value={filter}
                onChange={(e) => setFilter(e.currentTarget.value)}
                placeholder="Filter"
            />
            <div className="channel-dropdown no-scrollbar">
                {getSelectableChannels().map((selectableChannel) => (
                    <a
                        className={`channel-item ${selectableChannel.id === channel.id ? 'active' : ''}`}
                        onClick={() => setChannel(selectableChannel)}
                        style={{ color: '#fff' }}
                        key={selectableChannel.id}
                    >
                        #
                        {selectableChannel.name}
                    </a>
                ))}
            </div>
        </div>
    );
}
