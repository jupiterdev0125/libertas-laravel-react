import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ModerationCardHeader from '../ModerationCardHeader/ModerationCardHeader';
import AutoModerationEvents from './AutoModerationEvents/AutoModerationEvents';
import MessageEvents from './MessageEvents/MessageEvents';
import MemberEvents from './MemberEvents/MemberEvents';
import RoleEvents from './RoleEvents/RoleEvents';
import VoiceEvents from './VoiceEvents/VoiceEvents';
import ServerEvents from './ServerEvents/ServerEvents';
import ChannelEvents from './ChannelEvents/ChannelEvents';
import SingleChannelPicker from '../../common/forms/SingleChannelPicker/SingleChannelPicker';
import MultiChannelPicker from '../../common/forms/MultiChannelPicker/MultiChannelPicker';
import { selectChannels } from '../../../store/moderation/configSlice';
import {
    selectAuditLoggingChannel,
    selectAuditLoggingIgnoredChannels,
    updateAuditLoggingChannels,
} from '../../../store/moderation/auditLoggingSlice';

export default function AuditLogging() {
    // const guildId = useSelector(selectGuildId);
    const textChannels = useSelector(selectChannels);
    const channel = useSelector(selectAuditLoggingChannel);
    const ignored_channels = useSelector(selectAuditLoggingIgnoredChannels);
    const dispatch = useDispatch();

    const channelSelected = (selectedChannel) => {
        dispatch(updateAuditLoggingChannels({
            channel: selectedChannel,
            ignored_channels,
        }));
    };

    const ignoredChannelAdded = (addedChannel) => {
        dispatch(updateAuditLoggingChannels({
            channel,
            ignored_channels: [
                ...ignored_channels,
                addedChannel,
            ],
        }));
    };

    const ignoredChannelRemoved = (removedChannel) => {
        dispatch(updateAuditLoggingChannels({
            channel,
            ignored_channels: ignored_channels.filter((channel) => channel.id !== removedChannel.id),
        }));
    };

    return (
        <>
            <SectionHeader title="Audit Logging" withHelpIcon />
            <ModerationCardHeader uppercase text="logging channel" noButtons />
            <SingleChannelPicker
                channelSelectedListener={channelSelected}
                searchChannels={textChannels}
                selectedChannel={channel}
                labelProperty="name"
            />
            <ModerationCardHeader uppercase text="ignored channels" noButtons />
            <MultiChannelPicker
                searchChannels={textChannels}
                currentChannels={ignored_channels}
                labelProperty="name"
                keyProp="id"
                channelSelectedListener={ignoredChannelAdded}
                channelRemovedListener={ignoredChannelRemoved}
            />
            <AutoModerationEvents />
            <MessageEvents />
            <MemberEvents />
            <RoleEvents />
            <VoiceEvents />
            <ServerEvents />
            <ChannelEvents />
        </>
    );
}
