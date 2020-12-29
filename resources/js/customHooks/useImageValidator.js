import { useState } from 'react';

export const useImageValidator = () => {
    const [isValidating, setIsValidating] = useState(false);
    const [validationStatus, setValidationStatus] = useState({});

    const validateImage = (file) => {
        setIsValidating(true);
        const formData = new FormData();
        formData.append('image', file);
        axios
            .post('/api/upload/validate', formData)
            .then((response) => setValidationStatus({
                status: 200,
                valid: true,
                message: 'Image is valid!',
            }))
            .catch((response) => setValidationStatus({
                status: response.response.status,
                valid: false,
                message: response.response.data,
            }))
            .finally(() => setIsValidating(false));
    };
    return [validateImage, validationStatus, isValidating];
};
