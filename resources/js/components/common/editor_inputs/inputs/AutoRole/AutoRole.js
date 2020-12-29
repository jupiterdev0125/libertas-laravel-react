import React, { Fragment } from 'react';
import { useRoles } from '../../../../../customHooks/useRoles';
import MultiDropdownSelect from '../../../forms/MultiDropdownSelect/MultiDropdownSelect';
import './auto-role.css';
import { useValidation } from '../../../../../customHooks/useValidation';
import FailedValidation from '../../../validation/FailedValidation/FailedValidation';

export default function AutoRole({
    guildId,
    value,
    setValue,
    validationIssues,
    validationKey,
    light,
    selectableRoles,
    useProvidedRoles,
}) {
    let roles;
    if (!useProvidedRoles) {
        [roles] = useRoles(guildId);
    } else {
        roles = selectableRoles;
    }

    const getAddableRoles = () => {
        if (undefined === roles) {
            return undefined;
        }

        const selectedRoleIds = (value || []).map((selectedRole) => selectedRole.id);
        return roles.filter((role) => !selectedRoleIds.includes(role.id));
    };

    const hydrateRoles = (r) => (!r
        ? []
        : r?.map((v) => {
            if (v.id && !v.name && roles) {
                return roles.filter((role) => role.id === v.id)[0];
            }
            return v;
        }));

    const deleteRole = (role) => setValue(hydrateRoles(value).filter((allowedRole) => role.id !== allowedRole.id));

    const addRole = (role) => {
        setValue([...(value || []), role]);
    };

    const [valid] = useValidation(validationIssues, validationKey);

    return (
        <>
            {
                !valid && (
                    <FailedValidation message="Please choose a role." />
                )
            }

            <MultiDropdownSelect
                selectedItems={hydrateRoles(value)}
                searchItems={getAddableRoles()}
                itemSelectedListener={addRole}
                itemDeletedListener={deleteRole}
                labelProp="name"
                keyProp="id"
                menuClasses={!light ? 'multi-picker-dark-background' : 'multi-picker-light-dark-background'}
            />
        </>

    );
}
