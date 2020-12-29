import { useState } from 'react';
import { ajaxPost } from '../utils/FetchWrapper/FetchWrapper';

export const useFormHandler = (config) => {
    const [status, setStatus] = useState(undefined);
    const submit = (actionUrl, fieldValues) => {
        const formData = config.formHandler(config, fieldValues) || new FormData();
        ajaxPost(actionUrl, config.csrfToken, formData)
            .then((x) => {
                if (x.status !== 200) {
                    return 'error';
                }
                return x.text();
            })
            .then((x) => {
                if (x.toString() !== 'error' && config.formSuccessCallback) {
                    config.formSuccessCallback(x.toString());
                }
                setStatus(x);
                setTimeout(() => setStatus(undefined), 5000);
            });
    };

    return [submit, status];
};
