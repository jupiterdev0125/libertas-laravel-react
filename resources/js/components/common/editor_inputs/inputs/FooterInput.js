import React, { useEffect, useState } from 'react';
import { useImageValidator } from '../../../../customHooks/useImageValidator';
import { useValidation } from '../../../../customHooks/useValidation';
import FailedValidation from '../../validation/FailedValidation/FailedValidation';
import CharCount from '../../CharCount/CharCount';
import { validateImageResult } from '../../../../utils/validation/imageValidator';

export default function FooterInput({
    value,
    setValue,
    csrfToken,
    validationIssues,
    validationKey,
    globalCharLimitReached,
    light,
}) {
    const [validateImage, validationStatus, isValidating] = useImageValidator(csrfToken);
    const [valid] = useValidation(validationIssues, validationKey);
    const [currentFile, setCurrentFile] = useState(undefined);

    const handleChange = (e) => {
        const file = e.currentTarget.files[0];
        setCurrentFile(file);
        validateImage(file);
    };

    const handleTextChange = (e) => {
        const targetValue = e.currentTarget.value;
        const currentLength = value instanceof FormData ? (value.get('text') && value.get('text').length) || 0 : 0;
        if ((!globalCharLimitReached && targetValue.length < 1025)
            || (value && targetValue.length < currentLength)) {
            const formData = value || new FormData();

            formData.set('text', targetValue);
            setValue(formData);
        }
    };

    useEffect(() => {
        validateImageResult(validationStatus);
        if (validationStatus
            && validationStatus.valid) {
            const formData = value || new FormData();
            formData.set('image', currentFile);
            setValue(formData);
        }
    }, [validationStatus]);

    return (
        <div>
            <p className="d-inline text-uppercase font-600">Footer</p>
            {
                !valid && (
                    <FailedValidation message="Please create a footer." />
                )
            }
            <br />
            <label className={`btn ${light ? 'btn-upload-light' : 'btn-upload'} mb-2`}>
                UPLOAD
                <input type="file" accept="image/*" onChange={handleChange} className="d-none upload" />
            </label>
            <small className="ml-2">Max file size is 4mb</small>
            {isValidating ? <span className="pl-15">Validating...</span> : null}
            <br />
            <input
                type="text"
                className={`form-control ${!light ? 'input-text-dark' : 'input-text-light-dark'} input-min-height`}
                value={value instanceof FormData ? value.get('text') || '' : ''}
                onChange={handleTextChange}
            />
            <CharCount
                max={2048}
                count={value instanceof FormData ? (value.get('text') && value.get('text').length) || 0 : 0}
            />
        </div>
    );
}
