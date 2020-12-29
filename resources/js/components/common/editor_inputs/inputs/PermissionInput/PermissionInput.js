import React, { Fragment, useContext } from 'react';
import ConfigContext from '../../../../../context/ConfigContext';
import AutoRole from '../AutoRole/AutoRole';

export default function PermissionInput({
    guildId, value, setValue, light,
}) {
    const { config } = useContext(ConfigContext);
    const setAllowedRoles = (values) => {
        setValue({
            ...value,
            allowed: values,
        });
    };

    const setBannedRoles = (values) => {
        setValue({
            ...value,
            banned: values,
        });
    };

    const getAvailableRoles = () => config.roles?.filter((role) => !value.allowed?.filter((allow) => allow.id === role.id).length && !value.banned?.filter((ban) => ban.id === role.id).length) || config.roles;

    const hydrateRoles = (r) => (!r
        ? []
        : r?.map((v) => {
            if (v.id && !v.name && config.roles) {
                const filteredRole = config.roles.filter((role) => role.id === v.id);
                if (filteredRole.length === 1) {
                    return filteredRole[0];
                }
                console.error(`Cannot find role with id ${v.id}`);
            }
            return v;
        }));

    return (
        <>
            <div className="m-bot-1">
                <p className="d-inline text-uppercase">Allowed roles</p>
                <AutoRole
                    value={hydrateRoles(value?.allowed)}
                    setValue={setAllowedRoles}
                    guildId={guildId}
                    useProvidedRoles
                    selectableRoles={getAvailableRoles()}
                    light={light}
                />
            </div>
            <div className="m-bot-1">
                <p className="d-inline text-uppercase">Banned roles</p>
                <AutoRole
                    value={hydrateRoles(value?.banned)}
                    setValue={setBannedRoles}
                    useProvidedRoles
                    selectableRoles={getAvailableRoles()}
                    guildId={guildId}
                    light={light}
                />
            </div>
        </>
    );
}
