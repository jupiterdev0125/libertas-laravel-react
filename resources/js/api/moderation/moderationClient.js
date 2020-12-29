import axios from 'axios';

const basePath = (guildId) => `/api/plugins/${guildId}/moderation`;

export const putUpdateModerationRoles = (currentRoles, guildId) => {
    const requestBody = currentRoles.map((role) => role.id);
    return axios.put(`${basePath(guildId)}/roles`, requestBody);
};

export const putToggleCommand = (commandName, guildId) => axios.put(`${basePath(guildId)}/commands/${commandName}/toggle`);

export const putCommandRoles = (commandRolesUpdate, guildId) => {
    const requestBody = {
        banned_roles: commandRolesUpdate.banned_roles.map((role) => role.id),
        allowed_roles: commandRolesUpdate.allowed_roles.map((role) => role.id),
    };
    return axios.put(`${basePath(guildId)}/commands/${commandRolesUpdate.name}/roles`, requestBody);
};

export const putAuditLoggingChannels = (auditLoggingChannelUpdate, guildId) => {
    const requestBody = {
        channel: auditLoggingChannelUpdate.channel.id,
        ignored_channels: auditLoggingChannelUpdate.ignored_channels.map((channel) => channel.id),
    };
    return axios.put(`${basePath(guildId)}/audit-logging/channels`, requestBody);
};

export const putToggleAuditLoggingCommand = (commandName, guildId) => axios.put(`${basePath(guildId)}/audit-logging/${commandName}/toggle`);

export const putToggleAutoModerationCommand = (commandName, guildId) => axios.put(`${basePath(guildId)}/auto-moderation/${commandName}/toggle`);

export const putUpdateAutoModerationCommand = (command, guildId) => {
    const request = {
        ...command,
        allowed_roles: command.allowed_roles ? command.allowed_roles.map((role) => role.id) : [],
        ignored_channels: command.ignored_channels ? command.ignored_channels.map((channel) => channel.id) : [],
    };
    return axios.put(`${basePath(guildId)}/auto-moderation/${command.name}`, request);
};

export const putUpdatedAutomatedAction = (action, guildId) => axios.put(`${basePath(guildId)}/automated-actions`, action);

export const deleteRemoveAutomatedAction = (id, guildId) => axios.delete(`${basePath(guildId)}/automated-actions/${id}`);
