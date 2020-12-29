import axios from 'axios';

export const getFetchRoles = (guildId) => axios.get(`/api/guilds/${guildId}/roles`);

export const getFetchChannels = (guildId) => axios.get(`/api/guilds/${guildId}/channels`);
