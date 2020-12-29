import { defaultFormHandler } from './EmbedFormHandler';

export const reactionRoleFormHandler = (config, fieldValues) => {
    const formData = new FormData();
    formData.set('_token', config.csrfToken);
    formData.set('type', config.reactionRole.type);
    formData.set('id', config.reactionRole.id || '0');
    formData.set('name', fieldValues.map((x) => x.reactionRoleName).filter(Boolean)[0]);
    defaultFormHandler(fieldValues, config, formData);

    return formData;
};

export const timedMessageFormHandler = (config, fieldValues) => {
    const formData = new FormData();
    formData.set('_token', config.csrfToken);
    formData.set('type', config.message.type);
    formData.set('id', config.message.id || '0');
    formData.set('name', fieldValues.map((x) => x.messageName).filter(Boolean)[0]);
    defaultFormHandler(fieldValues, config, formData);

    return formData;
};

export const welcomeGoodbyeFormHandler = (config, fieldValues) => {
    const formData = new FormData();
    if (fieldValues.length !== 1) {
        console.error('Invalid fieldValues given. Expected length of 1, given: ', fieldValues);
        return formData;
    }

    formData.set('_token', config.csrfToken);
    formData.set('embed_id', fieldValues[0].embed?.id || '0');
    formData.set('type', fieldValues[0].type);
    formData.set('id', fieldValues[0].id || '0');
    defaultFormHandler(
        fieldValues.map((x) => x.embed),
        config,
        formData,
    );
    return formData;
};

export const socialMediaFormHandler = (config, fieldValues) => {
    const formData = new FormData();
    formData.set('_token', config.csrfToken);
    formData.set('id', config[config?.editorSelections[0]?.config?.title].id || '0');
    defaultFormHandler(fieldValues, config, formData);

    return formData;
};
