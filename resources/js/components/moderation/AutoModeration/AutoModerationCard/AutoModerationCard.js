import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../common/Card/Card';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import { voidListener } from '../../../../utils/staticValuesUtil';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import InputLargeLabel from '../../../common/forms/InputLargeLabel/InputLargeLabel';
import MultiChannelPicker from '../../../common/forms/MultiChannelPicker/MultiChannelPicker';
import { selectChannels, selectRoles } from '../../../../store/moderation/configSlice';
import AutoRole from '../../../common/editor_inputs/inputs/AutoRole/AutoRole';
import {
    toggleAutoModerationCommand,
    updateAutoModerationCommand,
} from '../../../../store/moderation/autoModerationSlice';

export default function AutoModerationCard({
    command,
    commandName,
    handleExpandCommand,
    selectedCommand,
    additionalInputComponent,
}) {
    const classNames = classnames({
        'd-none': selectedCommand !== command,
    });

    const commandData = useSelector((state) => state.autoModeration.commands.find(
        (currentCommand) => currentCommand.name === command,
    ));
    const channels = useSelector(selectChannels);
    const roles = useSelector(selectRoles);
    const dispatch = useDispatch();

    const ignoredChannelAdded = (channel) => {
        dispatch(updateAutoModerationCommand({
            ...commandData,
            ignored_channels: [
                ...commandData.ignored_channels,
                channel,
            ],
        }));
    };

    const ignoredChannelRemoved = (channel) => {
        dispatch(updateAutoModerationCommand({
            ...commandData,
            ignored_channels: commandData.ignored_channels.filter((item) => item.id !== channel.id),
        }));
    };

    const allowedRolesChanged = (roles) => {
        dispatch(updateAutoModerationCommand({
            ...commandData,
            allowed_roles: roles,
        }));
    };

    const toggleCommand = (commandName) => {
        dispatch(toggleAutoModerationCommand(commandName));
    };

    const toggleDeleteMessage = () => {
        dispatch(updateAutoModerationCommand({
            ...commandData,
            delete_message: !commandData.delete_message,
        }));
    };

    const toggleWarnMember = () => {
        dispatch(updateAutoModerationCommand({
            ...commandData,
            warn_member: !commandData.warn_member,
        }));
    };

    const toggleDmWarnMember = () => {
        dispatch(updateAutoModerationCommand({
            ...commandData,
            dm_warn_member: !commandData.dm_warn_member,
        }));
    };

    return (
        <Card className="simple-moderation-card">
            <ModerationCardHeader
                text={`${commandName}`}
                isEnabled={commandData.enabled}
                uppercase
                handleToggling={() => toggleCommand(commandData.name)}
                setSelectedCommand={handleExpandCommand}
                command={command}
            />
            <div className={classNames}>
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Delete Message"
                            checked={commandData.delete_message}
                            valueChangedListener={toggleDeleteMessage}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Warn Member"
                            checked={commandData.warn_member}
                            valueChangedListener={toggleWarnMember}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="DM Warn Member"
                            checked={commandData.dm_warn_member}
                            valueChangedListener={toggleDmWarnMember}
                        />
                    </div>
                </div>
                <InputLargeLabel text="Ignore channels" />
                <MultiChannelPicker
                    searchChannels={channels}
                    currentChannels={commandData.ignored_channels ? commandData.ignored_channels : []}
                    labelProperty="name"
                    keyProp="id"
                    channelSelectedListener={ignoredChannelAdded}
                    channelRemovedListener={ignoredChannelRemoved}
                    light
                />
                <InputLargeLabel text="Allowed Roles" />
                <AutoRole
                    useProvidedRoles
                    setValue={allowedRolesChanged}
                    selectableRoles={roles}
                    value={commandData.allowed_roles || []}
                    light
                />
                {additionalInputComponent}
            </div>
        </Card>
    );
}
