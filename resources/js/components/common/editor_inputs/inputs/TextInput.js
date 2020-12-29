import React from 'react';
import { useValidation } from '../../../../customHooks/useValidation';
import FailedValidation from '../../validation/FailedValidation/FailedValidation';
import CharCount from '../../CharCount/CharCount';

export default function TextInput({
    value,
    setValue,
    validationIssues,
    validationKey,
    globalCharLimitReached,
    light,
}) {
    const [valid] = useValidation(validationIssues, validationKey);

    const onValueChange = (e) => {
        const currentTarget = e.currentTarget.value;
        if ((!globalCharLimitReached && currentTarget.length < 257)
            || (value && currentTarget.length < value.length)) {
            setValue(currentTarget);
        }
    };

    return (
        <>
            {
                !valid && (
                    <FailedValidation message="Please write a value." />
                )
            }
            <input
                type="text"
                className={`form-control input-min-height ${light ? 'input-text-light-dark' : 'input-text-dark'}`}
                value={value || ''}
                onChange={onValueChange}
            />
            <CharCount count={value?.length || 0} max={256} />
        </>

    );
}
