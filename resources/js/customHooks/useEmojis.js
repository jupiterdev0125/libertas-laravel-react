import { useEffect, useState } from 'react';

export const useEmojis = (guildId) => {
    const [emojis, setEmojis] = useState(undefined);
    useEffect(() => {
        axios.get(`/api/guilds/${guildId}/emojis`).then((response) => {
            if (Array.isArray(response.data)) {
                setEmojis(response.data);
            }
        });
    }, []);
    return [emojis];
};
