import React, { Fragment, useRef } from 'react';
import { useValidation } from '../../../../customHooks/useValidation';
import FailedValidation from '../../validation/FailedValidation/FailedValidation';
import CharCount from '../../CharCount/CharCount';

export default function TextArea({
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
        if ((!globalCharLimitReached && currentTarget.length < 2049)
            || (value && currentTarget.length < value.length)) {
            setValue(e.currentTarget.value);
        }
    };

    return (
        <>
            {
                !valid && (
                    <FailedValidation message="Please write a value." />
                )
            }
            <textarea
                className={`form-control ${light ? 'text-area-light-dark' : 'text-area-dark'}`}
                value={value || ''}
                onChange={onValueChange}
            />
            <CharCount count={value?.length || 0} max={2048} />
        </>
    );
}
