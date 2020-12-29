import { useEffect, useState } from 'react';

export const useTextChannels = (guildId) => {
    const [textChannels, setTextChannels] = useState([]);
    useEffect(() => {
        guildId && axios.get(`/api/guilds/${guildId}/channels`).then((response) => {
            if (Array.isArray(response.data)) {
                setTextChannels(response.data.filter((channel) => channel.type === 0));
            }
        });
    }, [guildId]);
    return [textChannels];
};
