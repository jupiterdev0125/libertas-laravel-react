import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { putUpdateModerationRoles } from '../../api/moderation/moderationClient';
import { fireErrorToast } from '../../utils/toastUtils';

export const updateModerationRoles = createAsyncThunk('moderationRoles/updateRoles',
    async (currentRoles, thunkAPI) => {
        await putUpdateModerationRoles(currentRoles, thunkAPI.getState().config.data.guildId);
        return currentRoles;
    });

export const moderationRoles = createSlice({
    name: 'moderationRoles',
    initialState: {
        roles: [],
        isUpdating: false,
    },
    reducers: {
        setSelectedRoles: (state, action) => {
            state.roles = action.payload;
        },
    },
    extraReducers: {
        [updateModerationRoles.rejected]: (state, action) => {
            fireErrorToast(action.error.message);
        },
        [updateModerationRoles.fulfilled]: (state, action) => {
            state.roles = action.payload;
        },
    },
});

export const { setSelectedRoles } = moderationRoles.actions;

export const selectCurrentModerationRoles = (state) => state.moderationRoles.roles;

export const selectIsUpdateModerationRoles = (state) => state.moderationRoles.isUpdating;

export default moderationRoles.reducer;
