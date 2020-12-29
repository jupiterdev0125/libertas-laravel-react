import React, { useEffect, useState } from 'react';
import FailedValidation from '../../../validation/FailedValidation/FailedValidation';
import { FieldValidationConstants } from '../../../../../utils/validation/fieldValidation';
import CharCount from '../../../CharCount/CharCount';

export default function SingleFieldInput({
    index,
    val,
    fieldsValue,
    setValue,
    deleteField,
    validationIssues,
    globalCharLimitReached,
    light,
}) {
    const [validTitle, isValidTitle] = useState(true);
    const [validValue, isValidValue] = useState(true);
    useEffect(() => {
        if (validationIssues) {
            if (validationIssues.includes(FieldValidationConstants.TITLE + index)) {
                isValidTitle(false);
            } else {
                isValidTitle(true);
            }
            if (validationIssues.includes(FieldValidationConstants.VALUE + index)) {
                isValidValue(false);
            } else {
                isValidValue(true);
            }
        }
    }, [validationIssues]);

    const onTitleChange = (e) => {
        const targetValue = e.currentTarget.value;
        if ((!globalCharLimitReached && targetValue.length < 257)
            || (val && targetValue.length < val.length)) {
            const clone = [...fieldsValue];
            clone[index] = {
                ...clone[index],
                title: targetValue,
            };
            setValue(clone);
        }
    };

    const onBodyChange = (e) => {
        const targetValue = e.currentTarget.value;
        if ((!globalCharLimitReached && targetValue.length < 1025)
            || (val && targetValue.length < val.length)) {
            const clone = [...fieldsValue];
            clone[index] = {
                ...clone[index],
                value: targetValue,
            };
            setValue(clone);
        }
    };

    const onDisplayInlineChanged = (e) => {
        const clone = [...fieldsValue];
        clone[index] = {
            ...clone[index],
            inline: e.currentTarget.checked,
        };
        setValue(clone);
    };

    return (
        <div>
            <p className="d-inline text-uppercase font-600">
                Field #
                {index + 1}
            </p>
            <span className="d-inline float-right cursor-pointer" onClick={() => deleteField(index)}>
                <i
                    className="fas fa-times d-inline libertas-orange-new"
                    data-toggle="tooltip"
                    data-placement="right"
                    title={`Delete field #${index + 1}`}
                />
            </span>
            <div className="row m-top-1">
                <div className="col-12 pb-0 my-auto">
                    <p className="text-uppercase vertical-middle mb-0">Title</p>
                </div>
                <div className="col-12 m-bot-1">
                    {
                        !validTitle && (
                            <FailedValidation message="Please write a title." />
                        )
                    }
                    <textarea
                        className={`form-control ${light ? 'text-area-light-dark' : 'text-area-dark'}`}
                        value={val?.title}
                        onChange={onTitleChange}
                        required
                    />
                    <CharCount count={val?.title.length} max={256} />
                </div>
                <div className="col-12 pb-0 my-auto">
                    <p className="text-uppercase vertical-middle mb-0">Value</p>
                </div>
                <div className="col-12  m-bot-1">
                    {
                        !validValue && (
                            <FailedValidation message="Please write a value." />
                        )
                    }
                    <textarea
                        className={`form-control ${light ? 'text-area-light-dark' : 'text-area-dark'}`}
                        value={val?.value}
                        onChange={onBodyChange}
                        required
                    />
                    <CharCount count={val?.value.length} max={1024} />
                </div>
                <div className="col-12">
                    <p className="text-uppercase vertical-middle">Display inline</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            onChange={onDisplayInlineChanged}
                            checked={val?.inline === true ? 'checked' : false}
                        />
                        <span className="slider round" />
                    </label>
                </div>
            </div>
        </div>
    );
}
