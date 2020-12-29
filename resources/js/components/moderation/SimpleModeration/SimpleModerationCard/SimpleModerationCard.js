import React from 'react';
import classnames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import InputLargeLabel from '../../../common/forms/InputLargeLabel/InputLargeLabel';
import AutoRole from '../../../common/editor_inputs/inputs/AutoRole/AutoRole';
import { selectGuildId, selectRoles } from '../../../../store/moderation/configSlice';
import { toggleCommand, updateCommandRoles } from '../../../../store/moderation/simpleModerationSlice';

export default function SimpleModerationCard({
    displayName,
    commandName,
    handleExpandCommand,
    selectedCommand,
}) {
    const classNames = classnames({
        'd-none': selectedCommand !== commandName,
    });

    const command = useSelector((state) => state.simpleModeration.commands.find(
        (command) => command.name === commandName,
    ));

    const roles = useSelector(selectRoles);
    const guildId = useSelector(selectGuildId);
    const dispatch = useDispatch();

    const allowedRolesChanged = (value) => {
        const commandRolesUpdate = {
            name: command.name,
            allowed_roles: [
                ...value,
            ],
            banned_roles: [
                ...command.banned_roles,
            ],
        };
        dispatch(updateCommandRoles(commandRolesUpdate));
    };

    const bannedRolesChanged = (value) => {
        const commandRolesUpdate = {
            name: command.name,
            allowed_roles: [
                ...command.allowed_roles,
            ],
            banned_roles: [
                ...value,
            ],
        };
        dispatch(updateCommandRoles(commandRolesUpdate));
    };

    const handleToggle = () => {
        dispatch(toggleCommand(command.name));
    };

    return (
        <Card className="simple-moderation-card">
            <ModerationCardHeader
                text={`!${displayName}`}
                isEnabled={command.enabled}
                setSelectedCommand={handleExpandCommand}
                command={commandName}
                withHelpIcon
                handleToggling={handleToggle}
            />
            <div className={classNames}>
                <InputLargeLabel text="Allowed Roles" />
                <AutoRole
                    guildId={guildId}
                    value={command.allowed_roles}
                    setValue={allowedRolesChanged}
                    selectableRoles={roles}
                    useProvidedRoles
                    light
                />
                <InputLargeLabel text="Banned Roles" />
                <AutoRole
                    guildId={guildId}
                    value={command.banned_roles}
                    setValue={bannedRolesChanged}
                    selectableRoles={roles}
                    useProvidedRoles
                    light
                />
            </div>
        </Card>
    );
}
