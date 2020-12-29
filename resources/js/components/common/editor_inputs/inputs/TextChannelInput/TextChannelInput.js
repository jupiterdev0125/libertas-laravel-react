import React, { useState } from 'react';
import { useTextChannels } from '../../../../../customHooks/useTextChannels';
import LoadingIndicator from '../../../LoadingIndicator/LoadingIndicator';
import ChannelDropdown from './ChannelDropdown/ChannelDropdown';

export default function TextChannelInput({ guildId, value, setValue }) {
    const [textChannels] = useTextChannels(guildId);
    const selectedChannel = textChannels?.filter((textChannel) => textChannel.id === value?.id);

    const [showDropdown, setShowDropdown] = useState(false);

    const setChannel = (channel) => {
        // If user selected a channel hide dropdown
        setShowDropdown(false);
        setValue(channel);
    };

    return (
        <div>
            <div className="form-control" onClick={() => setShowDropdown(!showDropdown)}>
                {value?.id && textChannels?.length > 0 && selectedChannel !== undefined && selectedChannel.length !== 0
                    ? `#${selectedChannel[0].name}`
                    : 'Select a channel...'}
            </div>
            {showDropdown ? (
                textChannels?.length > 0 ? (
                    <ChannelDropdown channel={value || {}} selectableChannels={textChannels} setChannel={setChannel} />
                ) : (
                    <LoadingIndicator isLoaded={false} />
                )
            ) : null}
        </div>
    );
}
