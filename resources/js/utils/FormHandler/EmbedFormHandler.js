import { DEFAULT_EMBED_FIELDS } from '../configs/fieldConfigs';

export const defaultFormHandler = (fieldValues, config, formData) => {
    const embedFieldNames = DEFAULT_EMBED_FIELDS.map((x) => x.name);
    fieldValues.forEach((fieldValue, i) => {
        config.fields.forEach((configField) => {
            if (configField.formDataHandler === undefined || fieldValue[configField.name] === undefined) {
                return;
            }

            const values = configField.formDataHandler(fieldValue[configField.name]);
            if (embedFieldNames.includes(configField.name)) {
                values.forEach((formValue) => {
                    if (formValue[1] !== null && formValue[1] !== undefined) {
                        formData.append(`embeds[${i}][${formValue[0]}]`, formValue[1]);
                    }
                });
            } else {
                values.forEach((formValue) => {
                    formData.append(`${formValue[0]}[${i}]`, formValue[1]);
                });
            }
        });

        if (fieldValue.id) {
            formData.append(`embeds[${i}][id]`, fieldValue.id);
        }
    });
};
