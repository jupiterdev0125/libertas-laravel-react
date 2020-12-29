import React, { useState } from 'react';
import { ajaxPost } from '../../../utils/FetchWrapper/FetchWrapper';
import MultiEmbedEditor from '../../../components/common/EmbedEditor/MultiEmbedEditor';

export default function OverviewBody({
    entry, setEntry, deleteEntry, config, validators, pageType,
}) {
    const editorConfig = config.editorSelections.map((x) => x.config).filter((x) => x.type === entry.type);
    const [formStatus, setFormStatus] = useState(undefined);

    const updateCommandSubmitForm = (e) => {
        e.preventDefault();

        const formData = config.formHandler(getConfig(), entry.responses) || new FormData();
        let actionUrl = `/api/plugins/${config.guildId}/${pageType}`;
        if (entry.id !== undefined) {
            // I <3 PHP frameworks
            formData.set('_method', 'PUT');
            actionUrl += `/${entry.id}`;
        }

        ajaxPost(actionUrl, config.csrfToken, formData)
            .then((x) => {
                if (x.status !== 200) {
                    return 'error';
                }
                return x.text();
            })
            .then((x) => {
                if (config.updateEntrySuccessCallBack !== undefined) {
                    config.updateEntrySuccessCallBack(config, entry.id);
                }
                setFormStatus(x);
                setTimeout(() => setFormStatus(undefined), 5000);
            });
    };

    const getConfig = () => ({
        ...config,
        supportsMultiple: editorConfig[0]?.supportsMultiple || false,
        [config.formFieldToPopulateWithData]: {
            ...entry,
            ...editorConfig[0],
        },
        fields: config.fieldHandler(editorConfig[0]),
    });

    return (
        <div className="card-body">
            <MultiEmbedEditor
                editorValues={entry.responses.map((response) => ({
                    ...response,
                    id: response.id,
                }))}
                setEditorValues={(val) => {
                    setEntry({
                        ...entry,
                        responses: val,
                    });
                }}
                validators={validators}
                config={getConfig()}
                deleteEmbed={deleteEntry}
                submitForm={updateCommandSubmitForm}
                submissionStatus={formStatus}
            />
        </div>
    );
}
