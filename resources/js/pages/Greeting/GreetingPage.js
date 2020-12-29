import React, { Fragment, useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import { ajaxPost } from '../../utils/FetchWrapper/FetchWrapper';
import { transformMessage } from '../../utils/BackendTransformer/Transformer';
import GreetingMessageSelection from '../../components/greeting/GreetingMessageSelections/GreetingMessageSelection';
import { welcomeGoodbyeFormHandler } from '../../utils/FormHandler/FormHandler';
import {
    AUTO_ROLE_FIELD,
    DEFAULT_EMBED_FIELDS,
    SERVER_GOODBYE_CHANNEL_FIELD,
    SERVER_WELCOME_CHANNEL_FIELD,
} from '../../utils/configs/fieldConfigs';
import Editor from '../../components/common/editor/Editor/Editor';
import {
    addField,
    clearForm,
    createFieldNames,
    initiateFields,
    isFieldActive,
    toggleField,
} from '../../utils/editorHelpers';
import { validateGlobalCharCount } from '../../utils/validation/globalCharCountValidator';
import {
    validateDM,
    validateGoodbye,
    validateWelcome,
} from '../../components/greeting/GreetingEditor/validation/validateMessageForm';
import EditorPanel from '../../components/common/editor/EditorPanel/EditorPanel';
import WelcomeElementFields
    from '../../components/greeting/GreetingEditor/WelcomeMessagePanel/WelcomeElementFields/WelcomeElementFields';
import WelcomeFields from '../../components/greeting/GreetingEditor/WelcomeMessagePanel/WelcomeFields/WelcomeFields';
import DmFields from '../../components/greeting/GreetingEditor/DmMessagePanel/DmFields/DmFields';
import DmElementFields from '../../components/greeting/GreetingEditor/DmMessagePanel/DmElementFields/DmElementFields';
import GoodbyeFields from '../../components/greeting/GreetingEditor/GoodbyeMessagePanel/GoodbyeFields/GoodbyeFields';
import GoodbyeElementFields
    from '../../components/greeting/GreetingEditor/GoodbyeMessagePanel/GoodbyeElementFields/GoodbyeElementFields';

export const MessageTypes = {
    WELCOME: 'welcome',
    GOODBYE: 'goodbye',
    DM: 'dm',
};

const SERVER_WELCOME_CONFIG = {
    type: 'welcome',
    extraFields: [SERVER_WELCOME_CHANNEL_FIELD, AUTO_ROLE_FIELD],
};

const SERVER_GOODBYE_CONFIG = {
    type: 'goodbye',
    extraFields: [SERVER_GOODBYE_CHANNEL_FIELD],
};

const DM_WELCOME_CONFIG = {
    type: 'dm',
    extraFields: [AUTO_ROLE_FIELD],
};

export default function GreetingPage({ config, messages }) {
    const [messageState, setMessageState] = useState(messages);
    const [activePanel, setActivePanel] = useState('');
    const [formStatus, setFormStatus] = useState(undefined);
    const [validationIssues, setValidationIssues] = useState([]);
    const [currentValues, setCurrentValues] = useState({});
    const [fieldNames, setFieldNames] = useState([]);
    const [globalCharLimitReached, isGlobalCharLimitReached] = useState(false);
    const [activeFieldNames, setActiveFieldNames] = useState([]);

    useEffect(() => {
        setCurrentValues(filteredEditorValues().embed);
        setValidationIssues([]);
    }, [activePanel]);

    useEffect(() => {
        let currentFieldNames = [];
        switch (activePanel) {
        case MessageTypes.WELCOME: {
            currentFieldNames = createFieldNames([AUTO_ROLE_FIELD, ...DEFAULT_EMBED_FIELDS]);
            break;
        }
        case MessageTypes.DM: {
            currentFieldNames = createFieldNames([AUTO_ROLE_FIELD, ...DEFAULT_EMBED_FIELDS]);
            break;
        }
        case MessageTypes.GOODBYE: {
            currentFieldNames = createFieldNames([...DEFAULT_EMBED_FIELDS]);
            break;
        }
        }
        setFieldNames(currentFieldNames);
    }, [activePanel, currentValues]);

    useEffect(() => {
        validateGlobalCharCount(currentValues, isGlobalCharLimitReached);
    }, [currentValues, validationIssues]);

    useEffect(() => {
        setActiveFieldNames(initiateFields(fieldNames, currentValues));
    }, [fieldNames]);

    const getMessagesWithType = (type) => messageState.filter((message) => message.type === type);

    const getMessagesWithoutType = (type) => messageState.filter((message) => message.type !== type);

    const isFieldActiveListener = (fieldName) => isFieldActive(activeFieldNames, fieldName);

    const toggleFieldListener = (fieldName) => {
        toggleField(fieldName, activeFieldNames, setActiveFieldNames, currentValues, setEditorValuesForType);
    };

    const addFieldListener = () => {
        addField(currentValues, setEditorValuesForType);
    };

    const setEditorValuesForType = (values, clear) => {
        if (!activePanel) {
            return;
        }
        let doTouch = getMessagesWithType(activePanel);
        if (doTouch.length === 0) {
            doTouch = [
                {
                    type: activePanel,
                    embed: {},
                },
            ];
        }
        const embedFromBefore = clear ? {} : doTouch[0].embed;
        setMessageState([
            ...getMessagesWithoutType(activePanel),
            {
                ...doTouch[0],
                embed: {
                    ...embedFromBefore,
                    ...values,
                },
            },
        ]);
        setCurrentValues(values);
    };

    const getActivePanelComponent = () => {
        let fieldsComponent; let
            elementFieldsComponent;
        switch (activePanel) {
        case MessageTypes.WELCOME: {
            fieldsComponent = (
                <WelcomeFields
                    isFieldActive={isFieldActiveListener}
                    values={currentValues}
                    setValues={setEditorValuesForType}
                    validationIssues={validationIssues}
                    globalCharLimitReached={globalCharLimitReached}
                />
            );
            elementFieldsComponent = (
                <WelcomeElementFields
                    isFieldActive={isFieldActiveListener}
                    toggleField={toggleFieldListener}
                    addField={addFieldListener}
                    values={currentValues}
                />
            );
            break;
        }
        case MessageTypes.DM: {
            fieldsComponent = (
                <DmFields
                    isFieldActive={isFieldActiveListener}
                    values={currentValues}
                    setValues={setEditorValuesForType}
                    validationIssues={validationIssues}
                    globalCharLimitReached={globalCharLimitReached}
                />
            );
            elementFieldsComponent = (
                <DmElementFields
                    isFieldActive={isFieldActiveListener}
                    toggleField={toggleFieldListener}
                    addField={addFieldListener}
                    values={currentValues}
                />
            );
            break;
        }
        case MessageTypes.GOODBYE: {
            fieldsComponent = (
                <GoodbyeFields
                    isFieldActive={isFieldActiveListener}
                    values={currentValues}
                    setValues={setEditorValuesForType}
                    validationIssues={validationIssues}
                    globalCharLimitReached={globalCharLimitReached}
                />
            );
            elementFieldsComponent = (
                <GoodbyeElementFields
                    isFieldActive={isFieldActiveListener}
                    toggleField={toggleFieldListener}
                    addField={addFieldListener}
                    values={currentValues}
                />
            );
        }
        }
        if (fieldsComponent && elementFieldsComponent) {
            return (
                <EditorPanel
                    values={currentValues}
                    activeFieldNames={activeFieldNames}
                    fieldsComponent={fieldsComponent}
                    elementFieldsComponent={elementFieldsComponent}
                />
            );
        }
        return null;
    };

    const resetForm = () => {
        setValidationIssues([]);
        clearForm(currentValues, fieldNames, setEditorValuesForType);
    };

    const performSubmission = (e) => {
        e.preventDefault();
        let issues = [];
        switch (activePanel) {
        case MessageTypes.WELCOME: {
            issues = validateWelcome(currentValues);
            break;
        }
        case MessageTypes.DM: {
            issues = validateDM(currentValues);
            break;
        }
        case MessageTypes.GOODBYE: {
            issues = validateGoodbye(currentValues);
            break;
        }
        }
        setValidationIssues(issues);
        if (issues.length === 0) {
            submitForm(e);
        }
    };

    const submitForm = (e) => {
        e && e.preventDefault();

        const formData = welcomeGoodbyeFormHandler(getConfig(), [filteredEditorValues()]) || new FormData();
        let actionUrl = `/api/plugins/${config.guildId}/welcome-goodbye`;
        const typeMessage = getMessagesWithType(activePanel);
        if (typeMessage[0] && typeMessage[0].id !== undefined) {
            formData.set('_method', 'PUT');
            actionUrl += `/${getMessagesWithType(activePanel)[0].id}`;
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
                    let newMessage;
                    try {
                        newMessage = JSON.parse(x.toString());
                    } catch (e) {
                        console.error('parsing new command failed', e);
                        return;
                    }

                    setMessageState([...getMessagesWithoutType(newMessage[0].type), transformMessage(newMessage[0])]);
                }
            });
    };

    const getConfig = () => ({
        ...config,
        fields: [...(getActivePanelFormFields().extraFields || []), ...config.fields],
    });

    const getActivePanelFormFields = () => {
        switch (activePanel) {
        case MessageTypes.WELCOME:
            return SERVER_WELCOME_CONFIG;
        case MessageTypes.DM:
            return DM_WELCOME_CONFIG;
        case MessageTypes.GOODBYE:
            return SERVER_GOODBYE_CONFIG;
        }
    };

    const filteredEditorValues = () => {
        const filtered = messageState.filter((message) => message.type === activePanel);
        if (filtered.length === 0) {
            return { embed: {} };
        }
        return filtered[0];
    };

    const renderDeleteMessage = () => {
        const filtered = getMessagesWithType(activePanel);
        if (filtered.length === 1 && filtered[0].id !== undefined) {
            return () => {
                const formData = new FormData();
                formData.set('_method', 'DELETE');
                formData.set('id', filtered[0].id);
                formData.set('embed_id', filtered[0].embed.id);
                formData.set('_token', config.csrfToken);
                ajaxPost(
                    `/api/plugins/${config.guildId}/welcome-goodbye/${filtered[0].id}`,
                    config.csrfToken,
                    formData,
                ).then(() => {
                    setMessageState([...getMessagesWithoutType(activePanel)]);
                });
            };
        }
        return undefined;
    };

    return (
        <>
            <div className="container m-bot-4">
                <PageHeader config={config} pageType="welcome-goodbye" pageTitle="Welcome & Goodbye" />
                <GreetingMessageSelection messages={messageState} activePanelChangedListener={setActivePanel} />
                <Editor
                    activePanel={activePanel}
                    activePanelComponent={getActivePanelComponent()}
                    deleteData={renderDeleteMessage()}
                    setValues={setEditorValuesForType}
                    values={currentValues}
                    submissionStatus={formStatus}
                    performSubmission={performSubmission}
                    resetForm={resetForm}
                />
            </div>
        </>
    );
}
