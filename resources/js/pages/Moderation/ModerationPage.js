import React from 'react';
import { Provider } from 'react-redux';
import { createServer, Response } from 'miragejs';
import { nanoid } from '@reduxjs/toolkit';
import moderationStore from '../../store/moderation/moderationStore';
import ModerationContainer from './ModerationContainer';

createServer({
    routes() {
        this.passthrough();

        this.put('/api/plugins/:guildId/moderation/roles', () => new Response(200));

        this.put('/api/plugins/:guildId/moderation/commands/:command/roles', () => new Response(200));

        this.put('/api/plugins/:guildId/moderation/commands/:command/toggle', () => new Response(200));

        this.put('/api/plugins/:guildId/moderation/audit-logging/channels', () => new Response(200));

        this.put('/api/plugins/:guildId/moderation/audit-logging/:command/toggle', () => new Response(200));

        this.put('/api/plugins/:guildId/moderation//auto-moderation/:command/toggle', () => new Response(200));

        this.put('/api/plugins/:guildId/moderation/auto-moderation/:command', () => new Response(200));

        this.put('/api/plugins/:guildId/moderation/automated-actions', (schema, request) => {
            const body = JSON.parse(request.requestBody);
            return {
                ...body,
                is_new: false,
                id: nanoid(),
            };
        });

        this.delete('/api/plugins/:guildId/moderation/automated-actions/:action', () => new Response(200));
    },
});

export default function ModerationPage() {
    return (
        <Provider store={moderationStore}>
            <ModerationContainer />
        </Provider>
    );
}
