import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { putAuditLoggingChannels, putToggleAuditLoggingCommand } from '../../api/moderation/moderationClient';
import { fireErrorToast } from '../../utils/toastUtils';

export const updateAuditLoggingChannels = createAsyncThunk('auditLogging/updateChannels',
    async (auditLoggingChannelUpdate, thunkAPI) => {
        await putAuditLoggingChannels(auditLoggingChannelUpdate, thunkAPI.getState().config.data.guildId);
        return auditLoggingChannelUpdate;
    });

export const toggleAuditLoggingCommand = createAsyncThunk('auditLogging/toggleCommand',
    async (toggleAuditLoggingUpdate, thunkAPI) => {
        await putToggleAuditLoggingCommand(toggleAuditLoggingUpdate.commandName, thunkAPI.getState().config.data.guildId);
        return toggleAuditLoggingUpdate;
    });

export const auditLoggingSlice = createSlice({
    name: 'auditLogging',
    initialState: {
        channel: {},
        ignored_channels: [],
        autoModerationEvents: {},
        messageEvents: {},
        memberEvents: {},
        roleEvents: {},
        voiceEvents: {},
        serverEvents: {},
        channelEvents: {},
    },
    reducers: {
        setChannel: (state, action) => state.channel = action.payload,
        setIgnoredChannels: (state, action) => state.ignoredChannels = action.payload,
        setAutoModerationEvents: (state, action) => state.autoModerationEvents = action.payload,
        setMessageEvents: (state, action) => state.messageEvents = action.payload,
        setRoleEvents: (state, action) => state.role = action.payload,
        setVoiceEvents: (state, action) => state.voiceEvents = action.payload,
        setServerEvents: (state, action) => state.serverEvents = action.payload,
        setChannelEvents: (state, action) => state.channelEvents = action.payload,
    },
    extraReducers: {
        [updateAuditLoggingChannels.fulfilled]: (state, action) => {
            state.channel = action.payload.channel;
            state.ignored_channels = action.payload.ignored_channels;
        },
        [updateAuditLoggingChannels.rejected]: (state, action) => {
            fireErrorToast(action.payload.message);
        },

        [toggleAuditLoggingCommand.rejected]: (state, action) => {
            fireErrorToast(action.payload.message);
        },

        [toggleAuditLoggingCommand.fulfilled]: (state, action) => {
            const currentState = state[action.payload.type][action.payload.commandName];
            state[action.payload.type] = {
                ...state[action.payload.type],
                [action.payload.commandName]: !currentState,
            };
        },
    },
});

export const selectAuditLoggingChannel = (state) => state.auditLogging.channel;
export const selectAuditLoggingIgnoredChannels = (state) => state.auditLogging.ignored_channels;

export const {
    setChannel,
    setIgnoredChannels,
    setAutoModerationEvents,
    setMessageEvents,
    setRoleEvents,
    setVoiceEvents,
    setServerEvents,
    setChannelEvents,
} = auditLoggingSlice.actions;

export default auditLoggingSlice.reducer;
