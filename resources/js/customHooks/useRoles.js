import { useEffect, useState } from 'react';

export const useRoles = (guildId) => {
    const [roles, setRoles] = useState(undefined);
    useEffect(() => {
        guildId && axios.get(`/api/guilds/${guildId}/roles`).then((response) => {
            if (Array.isArray(response.data)) {
                setRoles(response.data);
            }
        });
    }, [guildId]);
    return [roles];
};
