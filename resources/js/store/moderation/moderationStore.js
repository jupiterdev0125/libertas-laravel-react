import { configureStore } from '@reduxjs/toolkit';
import moderationRolesSlice from './moderationRolesSlice';
import configSlice from './configSlice';
import simpleModerationSlice from './simpleModerationSlice';
import auditLoggingSlice from './auditLoggingSlice';
import autoModerationSlice from './autoModerationSlice';
import automatedActions from './automatedActions';

export default configureStore({
    reducer: {
        config: configSlice,
        moderationRoles: moderationRolesSlice,
        simpleModeration: simpleModerationSlice,
        auditLogging: auditLoggingSlice,
        autoModeration: autoModerationSlice,
        automatedActions,
    },
});
