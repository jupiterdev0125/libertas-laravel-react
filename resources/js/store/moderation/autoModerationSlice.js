import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { putToggleAutoModerationCommand, putUpdateAutoModerationCommand } from '../../api/moderation/moderationClient';
import { fireErrorToast } from '../../utils/toastUtils';

const createInitialState = () => [
    'bad_words',
    'repeated_text',
    'server_invites',
    'external_links',
    'excessive_caps',
    'excessive_emojis',
    'excessive_spoilers',
    'excessive_mentions',
    'zalgo',
].map((name) => ({
    name,
    ignored_channels: [],
    allowed_roles: [],
    enabled: false,
}));

export const updateAutoModerationCommand = createAsyncThunk('autoModeration/updateCommand',
    async (command, thunkApi) => {
        await putUpdateAutoModerationCommand(command, thunkApi.getState().config.data.guildId);
        return command;
    });

export const toggleAutoModerationCommand = createAsyncThunk('autoModeration/toggleCommand',
    async (commandName, thunkApi) => {
        await putToggleAutoModerationCommand(commandName, thunkApi.getState().config.data.guildId);
        return commandName;
    });

export const autoModerationSlice = createSlice({
    name: 'autoModeration',
    initialState: {
        commands: createInitialState(),
    },
    reducers: {
        setCommands: (state, action) => {
            state.commands = action.payload;
        },
    },
    extraReducers: {
        [updateAutoModerationCommand.fulfilled]: (state, action) => {
            state.commands = [
                ...state.commands.filter((command) => command.name !== action.payload.name),
                action.payload,
            ];
        },
        [updateAutoModerationCommand.rejected]: (state, action) => {
            fireErrorToast(action.payload.message);
        },

        [toggleAutoModerationCommand.fulfilled]: (state, action) => {
            const commandName = action.payload;
            state.commands = state.commands.map((command) => {
                if (command.name === commandName) {
                    const currentState = command.enabled;
                    return {
                        ...command,
                        enabled: !currentState,
                    };
                }
                return command;
            });
        },
        [toggleAutoModerationCommand.rejected]: (state, action) => {
            fireErrorToast(action.payload.message);
        },
    },
});

export const selectBadWordsCommand = (state) => state.autoModeration.commands.find((command) => command.name === 'bad_words');

export const selectExternalLinksCommand = (state) => state.autoModeration.commands.find((command) => command.name === 'external_links');

export const selectExcessiveEmojisCommand = (state) => state.autoModeration.commands.find((command) => command.name === 'excessive_emojis');

export const selectExcessiveSpoilersCommand = (state) => state.autoModeration.commands.find((command) => command.name === 'excessive_spoilers');

export const selectExcessiveMentionsCommand = (state) => state.autoModeration.commands.find((command) => command.name === 'excessive_mentions');

export default autoModerationSlice.reducer;
