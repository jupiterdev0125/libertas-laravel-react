import { useEffect, useState } from 'react';
import { checkIfValid } from '../utils/validationHelpers';

export const useValidation = (validationIssues, validationKey) => {
    const [valid, isValid] = useState(true);

    useEffect(() => {
        checkIfValid(validationIssues, validationKey, isValid);
    }, [validationIssues, validationKey]);

    return [valid];
};
