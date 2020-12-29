import React, { Fragment, useState } from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import SimpleModerationCard from './SimpleModerationCard/SimpleModerationCard';

export default function SimpleModeration() {
    const [selectedCommand, setSelectedCommand] = useState('');

    const handleExpandCommand = (command) => {
        if (command === selectedCommand) {
            setSelectedCommand('');
        } else {
            setSelectedCommand(command);
        }
    };

    return (
        <>
            <SectionHeader title="Simple Moderation" />
            <SimpleModerationCard
                displayName="ban"
                commandName="ban"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="unban"
                commandName="unban"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="tempban"
                commandName="tempban"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="clear"
                commandName="clear"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="kick"
                commandName="kick"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="mute"
                commandName="mute"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="unmute"
                commandName="unmute"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="tempmute"
                commandName="tempmute"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="warn"
                commandName="warn"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="warnings"
                commandName="warnings"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="clear-warnings"
                commandName="clear_warnings"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="suspend"
                commandName="suspend"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="unsuspend"
                commandName="unsuspend"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="server-info"
                commandName="server_info"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="role-info"
                commandName="role_info"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="user-info"
                commandName="user_info"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="slowmode"
                commandName="slowmode"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="lockdown"
                commandName="lockdown"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
            <SimpleModerationCard
                displayName="role-all"
                commandName="role_all"
                handleExpandCommand={handleExpandCommand}
                selectedCommand={selectedCommand}
            />
        </>
    );
}
