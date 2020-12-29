import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { putUpdatedAutomatedAction, deleteRemoveAutomatedAction } from '../../api/moderation/moderationClient';

export const saveAutomatedAction = createAsyncThunk('automatedActions/saveAction',
    async (data, thunkApi) => {
        const response = await putUpdatedAutomatedAction(data, thunkApi.getState().config.data.guildId);
        return {
            data: response.data,
            oldId: data.id,
        };
    });

export const deleteAutomatedAction = createAsyncThunk('automatedActions/deleteAction',
    async (id, thunkApi) => {
        await deleteRemoveAutomatedAction(id, thunkApi.getState().config.data.guildId);
        return thunkApi.dispatch(removeAction(id));
    });

export const automatedActions = createSlice({
    name: 'automatedActions',
    initialState: {
        actions: [],
    },
    reducers: {
        setActions: (state, action) => {
            state.actions = action.payload;
        },
        addAction: (state) => {
            state.actions = [
                ...state.actions,
                {
                    id: nanoid(),
                    action: 'ban',
                    warnings_number: 1,
                    period_count: 1,
                    period: 'days',
                    is_new: true,
                },
            ];
        },
        updateAction: (state, action) => {
            const index = state.actions.findIndex(
                (item) => item.id === action.payload.id,
            );
            const newArray = state.actions.slice();
            newArray.splice(index, 1, action.payload);
            state.actions = newArray;
        },
        removeAction: (state, action) => {
            state.actions = state.actions.filter((item) => item.id !== action.payload);
        },
    },
    extraReducers: {
        [saveAutomatedAction.fulfilled]: (state, action) => {
            const index = state.actions.findIndex(
                (item) => item.id === action.payload.oldId,
            );
            const newArray = state.actions.slice();
            newArray.splice(index, 1, action.payload.data);
            state.actions = newArray;
        },
    },
});

export const {
    setActions, addAction, updateAction, removeAction,
} = automatedActions.actions;

export const selectActions = (state) => state.automatedActions.actions;

export default automatedActions.reducer;
