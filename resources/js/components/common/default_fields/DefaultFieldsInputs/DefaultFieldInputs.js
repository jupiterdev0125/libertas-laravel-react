import React, { Fragment } from 'react';
import EmbedEditorFieldArea from '../../EmbedEditorFieldArea/EmbedEditorFieldArea';
import {
    BODY_FIELD,
    BODY_IMAGE_FIELD,
    COLOR_FIELD,
    FIELD_FIELD,
    FOOTER_FIELD,
    PLAIN_TEXT_FIELD,
    THUMBNAIL_FIELD,
    TITLE_FIELD,
    TITLE_IMAGE_FIELD,
} from '../../../../utils/configs/fieldConfigs';
import TextArea from '../../editor_inputs/inputs/TextArea';
import { setValueForField } from '../../../../utils/editorHelpers';
import TextInput from '../../editor_inputs/inputs/TextInput';
import FieldInput from '../../editor_inputs/inputs/FieldInput';
import FileInput from '../../editor_inputs/inputs/FileInput';
import FooterInput from '../../editor_inputs/inputs/FooterInput';
import ColorPicker from '../../editor_inputs/inputs/ColorPicker/ColorPicker';

export default function DefaultFieldInputs({
    values,
    setValues,
    isFieldActive,
    csrfToken,
    validationIssues,
    globalCharLimitReached,
    light,
}) {
    return (
        <>
            <EmbedEditorFieldArea
                description={PLAIN_TEXT_FIELD.description}
                infoText={PLAIN_TEXT_FIELD.infoText}
                field={(
                    <TextArea
                        value={values[PLAIN_TEXT_FIELD.name]}
                        setValue={(value) => setValueForField(values, PLAIN_TEXT_FIELD.name, value, setValues)}
                        validationIssues={validationIssues}
                        validationKey={PLAIN_TEXT_FIELD.name}
                        globalCharLimitReached={globalCharLimitReached}
                        light={light}
                    />
                )}
                isActive={isFieldActive(PLAIN_TEXT_FIELD.name)}
            />
            <EmbedEditorFieldArea
                description={TITLE_FIELD.description}
                infoText={TITLE_FIELD.infoText}
                field={(
                    <TextInput
                        value={values[TITLE_FIELD.name]}
                        setValue={(value) => setValueForField(values, TITLE_FIELD.name, value, setValues)}
                        validationIssues={validationIssues}
                        validationKey={TITLE_FIELD.name}
                        globalCharLimitReached={globalCharLimitReached}
                        light={light}
                    />
                )}
                isActive={isFieldActive(TITLE_FIELD.name)}
            />
            <EmbedEditorFieldArea
                description={BODY_FIELD.description}
                infoText={BODY_FIELD.infoText}
                field={(
                    <TextArea
                        value={values[BODY_FIELD.name]}
                        setValue={(value) => setValueForField(values, BODY_FIELD.name, value, setValues)}
                        validationIssues={validationIssues}
                        validationKey={BODY_FIELD.name}
                        globalCharLimitReached={globalCharLimitReached}
                        light={light}
                    />
                )}
                isActive={isFieldActive(BODY_FIELD.name)}
            />
            <EmbedEditorFieldArea
                alwaysDisplay
                hideDescription
                field={(
                    <FieldInput
                        value={values[FIELD_FIELD.name]}
                        setValue={(value) => setValueForField(values, FIELD_FIELD.name, value, setValues)}
                        validationIssues={validationIssues}
                        globalCharLimitReached={globalCharLimitReached}
                        light={light}
                    />
                )}
            />
            <EmbedEditorFieldArea
                description={THUMBNAIL_FIELD.description}
                infoText={THUMBNAIL_FIELD.infoText}
                field={(
                    <FileInput
                        value={values[THUMBNAIL_FIELD.name]}
                        setValue={(value) => setValueForField(values, THUMBNAIL_FIELD.name, value, setValues)}
                        csrfToken={csrfToken}
                        validationIssues={validationIssues}
                        validationKey={THUMBNAIL_FIELD.name}
                        light={light}
                    />
                )}
                isActive={isFieldActive(THUMBNAIL_FIELD.name)}
            />
            <EmbedEditorFieldArea
                description={TITLE_IMAGE_FIELD.description}
                infoText={TITLE_IMAGE_FIELD.infoText}
                field={(
                    <FileInput
                        value={values[TITLE_IMAGE_FIELD.name]}
                        setValue={(value) => setValueForField(values, TITLE_IMAGE_FIELD.name, value, setValues)}
                        csrfToken={csrfToken}
                        validationIssues={validationIssues}
                        validationKey={TITLE_IMAGE_FIELD.name}
                        light={light}
                    />
                )}
                isActive={isFieldActive(TITLE_IMAGE_FIELD.name)}
            />
            <EmbedEditorFieldArea
                description={BODY_IMAGE_FIELD.description}
                infoText={BODY_IMAGE_FIELD.infoText}
                field={(
                    <FileInput
                        value={values[BODY_IMAGE_FIELD.name]}
                        setValue={(value) => setValueForField(values, BODY_IMAGE_FIELD.name, value, setValues)}
                        csrfToken={csrfToken}
                        validationIssues={validationIssues}
                        validationKey={BODY_IMAGE_FIELD.name}
                        light={light}
                    />
                )}
                isActive={isFieldActive(BODY_IMAGE_FIELD.name)}
            />
            <EmbedEditorFieldArea
                description={FOOTER_FIELD.description}
                infoText={FOOTER_FIELD.infoText}
                hideDescription
                field={(
                    <FooterInput
                        value={values[FOOTER_FIELD.name]}
                        setValue={(value) => setValueForField(values, FOOTER_FIELD.name, value, setValues)}
                        csrfToken={csrfToken}
                        validationIssues={validationIssues}
                        validationKey={FOOTER_FIELD.name}
                        globalCharLimitReached={globalCharLimitReached}
                        light={light}
                    />
                )}
                isActive={isFieldActive(FOOTER_FIELD.name)}
            />
            <EmbedEditorFieldArea
                description={COLOR_FIELD.description}
                infoText={COLOR_FIELD.infoText}
                field={(
                    <ColorPicker
                        value={values[COLOR_FIELD.name]}
                        setValue={(value) => setValueForField(values, COLOR_FIELD.name, value, setValues)}
                        validationIssues={validationIssues}
                        validationKey={COLOR_FIELD.name}
                    />
                )}
                isActive={isFieldActive(COLOR_FIELD.name)}
            />
        </>
    );
}
