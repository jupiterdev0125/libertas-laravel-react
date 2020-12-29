import React, { useEffect } from 'react';
import { useImageValidator } from '../../../../customHooks/useImageValidator';
import { useValidation } from '../../../../customHooks/useValidation';
import FailedValidation from '../../validation/FailedValidation/FailedValidation';
import { validateImageResult } from '../../../../utils/validation/imageValidator';

export default function FileInput({
    setValue,
    csrfToken,
    validationIssues,
    validationKey,
    light,
}) {
    const [validateImage, validationStatus, isValidating] = useImageValidator(csrfToken);
    const [valid] = useValidation(validationIssues, validationKey);

    const handleChange = (e) => {
        const file = e.currentTarget.files[0];
        const formData = new FormData();
        formData.set('image', file);
        setValue(formData);
        validateImage(file);
    };

    useEffect(() => {
        if (Object.keys(validationStatus).length === 0) return;
        validateImageResult(validationStatus);
        if (validationStatus && !validationStatus.valid) {
            setValue(undefined);
        }
    }, [validationStatus]);

    return (
        <div>
            {
                !valid && (
                    <FailedValidation message="Please upload a file." />
                )
            }
            <label className={`btn ${light ? 'btn-upload-light' : 'btn-upload'}`}>
                UPLOAD
                <input type="file" accept="image/*" onChange={handleChange} className="d-none upload" />
            </label>
            <small className="ml-2">Max file size is 4mb</small>
            {isValidating ? <span className="pl-15">Validating...</span> : null}
        </div>
    );
}
