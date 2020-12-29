import React, { useState } from 'react';
import { ajaxPost } from '../../utils/FetchWrapper/FetchWrapper';
import MultiEmbedEditor from '../../components/common/EmbedEditor/MultiEmbedEditor';

export default function BaseEntryEditor({
    config,
    validators,
    editorConfig,
    setEditorConfig,
    editorValues,
    setEditorValues,
    entries,
    setEntries,
    pageType,
}) {
    const [formStatus, setFormStatus] = useState(undefined);

    const getConfig = () => ({
        ...config,
        supportsMultiple: editorConfig?.supportsMultiple || false,
        [config.formFieldToPopulateWithData]: {
            ...(editorConfig || {}),
        },
    });

    const createEntrySubmitForm = (e) => {
        e.preventDefault();

        const formData = config.formHandler(getConfig(), editorValues) || new FormData();
        let actionUrl = `/api/plugins/${config.guildId}/${pageType}`;
        if (editorValues.id !== undefined) {
            // I <3 PHP frameworks
            formData.set('_method', 'PUT');
            actionUrl += `/${editorValues.id}`;
        }

        ajaxPost(actionUrl, config.csrfToken, formData)
            .then((x) => {
                if (x.status !== 200) {
                    return 'error';
                }
                return x.text();
            })
            .then((x) => {
                setFormStatus(x);
                setTimeout(() => setFormStatus(undefined), 5000);

                if (!['OK', 'error'].includes(x.toString())) {
                    let newEntry;
                    try {
                        newEntry = JSON.parse(x.toString());
                    } catch (e) {
                        console.error('parsing new entry failed', e);
                        return;
                    }

                    if (config.createEntrySuccessCallBack !== undefined) {
                        config.createEntrySuccessCallBack(config, newEntry[0].id);
                    }

                    setEntries([...entries, config.transformerCallback(newEntry[0])]);
                    setEditorConfig(undefined);
                    setEditorValues([{}]);
                }
            });
    };

    if (editorConfig === undefined) {
        return null;
    }

    return (
        <MultiEmbedEditor
            config={getConfig()}
            validators={validators}
            editorValues={editorValues}
            setEditorValues={setEditorValues}
            submitForm={createEntrySubmitForm}
            submissionStatus={formStatus === 'error' ? formStatus : undefined}
        />
    );
}
