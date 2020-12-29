import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { putCommandRoles, putToggleCommand } from '../../api/moderation/moderationClient';
import { fireErrorToast } from '../../utils/toastUtils';

export const toggleCommand = createAsyncThunk('simpleModeration/toggleCommand',
    async (commandName, thunkAPI) => {
        await putToggleCommand(commandName, thunkAPI.getState().config.data.guildId);
        return commandName;
    });

export const updateCommandRoles = createAsyncThunk('simpleModeration/updateCommandRoles',
    async (commandRolesUpdate, thunkAPI) => {
        await putCommandRoles(commandRolesUpdate, thunkAPI.getState().config.data.guildId);
        return commandRolesUpdate;
    });

const createInitialState = () => {
    const names = [
        'ban',
        'unban',
        'tempban',
        'clear',
        'kick',
        'mute',
        'unmute',
        'tempmute',
        'warn',
        'warnings',
        'clear_warnings',
        'suspend',
        'unsuspend',
        'server_info',
        'role_info',
        'user_info',
        'slowmode',
        'lockdown',
        'role_all',
    ];
    return names.map((name) => ({
        name,
        banned_roles: [],
        allowed_roles: [],
        enabled: false,
    }));
};

export const simpleModerationSlice = createSlice({
    name: 'simpleModeration',
    initialState: {
        commands: createInitialState(),
    },
    reducers: {
        setCommands: (state, action) => {
            state.commands = action.payload;
        },
    },
    extraReducers: {
        [toggleCommand.rejected]: (state, action) => {
            fireErrorToast(action.error.message);
        },
        [toggleCommand.fulfilled]: (state, action) => {
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

        [updateCommandRoles.rejected]: (state, action) => {
            fireErrorToast(action.error.message);
        },
        [updateCommandRoles.fulfilled]: (state, action) => {
            state.commands = state.commands.map((command) => {
                if (command.name === action.payload.name) {
                    return {
                        ...command,
                        banned_roles: [
                            ...action.payload.banned_roles,
                        ],
                        allowed_roles: [
                            ...action.payload.allowed_roles,
                        ],
                    };
                }
                return command;
            });
        },
    },
});

export const { setCommands } = simpleModerationSlice.actions;

export const selectCurrentModerationRoles = (state) => state.simpleModeration.command;

export default simpleModerationSlice.reducer;
