import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFetchChannels, getFetchRoles } from '../../api/moderation/configClient';
import { fireErrorToast } from '../../utils/toastUtils';

export const fetchConfigRoles = createAsyncThunk('config/fetchConfigRoles',
    async (_, thunkAPI) => {
        const response = await getFetchRoles(thunkAPI.getState().config.data.guildId);
        return response.data;
    });

export const fetchConfigChannels = createAsyncThunk('config/fetchConfigChannels',
    async (_, thunkAPI) => {
        const response = await getFetchChannels(thunkAPI.getState().config.data.guildId);
        return response.data;
    });

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        data: {},
        roles: undefined,
        channels: [],
    },
    reducers: {
        setConfig: (state, action) => {
            state.data = action.payload;
        },

    },
    extraReducers: {
        [fetchConfigRoles.rejected]: (state, action) => {
            fireErrorToast(action.payload.message);
        },
        [fetchConfigRoles.fulfilled]: (state, action) => {
            state.roles = action.payload;
        },

        [fetchConfigChannels.rejected]: (state, action) => {
            fireErrorToast(action.payload.message);
        },
        [fetchConfigChannels.fulfilled]: (state, action) => {
            state.channels = action.payload;
        },
    },
});

export const { setConfig } = configSlice.actions;

export const selectGuildId = (state) => state.config.data.guildId;

export const selectRoles = (state) => state.config.roles;
export const selectChannels = (state) => state.config.channels;

export default configSlice.reducer;
