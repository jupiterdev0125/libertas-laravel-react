export const checkIfValid = (validationIssues, validationKey, isValid) => {
    if (validationIssues && validationIssues.includes(validationKey)) {
        isValid(false);
    } else {
        isValid(true);
    }
};
