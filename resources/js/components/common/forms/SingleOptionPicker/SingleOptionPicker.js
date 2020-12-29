import React from 'react';
import classnames from 'classnames';
import DropdownSearchableMenu from '../DropdownSearchableMenu/DropdownSearchableMenu';
import FailedValidation from '../../validation/FailedValidation/FailedValidation';
import { useValidation } from '../../../../customHooks/useValidation';

export default function SingleOptionPicker({
    selectedOption,
    searchOptions,
    optionSelectedListener,
    labelProperty,
    valueProperty,
    validationIssues,
    validationKey,
    light,
}) {
    const getLabel = (value) => (value?.id && searchOptions?.length > 0
        ? searchOptions?.filter((channel) => channel.id === value.id)[0].name
        : 'Choose an option...');

    const buttonComponent = (
        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {getLabel(selectedOption)}
        </button>
    );

    const [valid] = useValidation(validationIssues, validationKey);
    const selectClasses = classnames('col-12 col-lg-12 m-bot-1 libertas-green single-channel-select has-drop-down', {
        'single-channel-select-light-background': light,
    });

    return (
        <div className="row">
            <div className="container">
                {
                    !valid && (
                        <FailedValidation message="Please choose an option." />
                    )
                }

                <div className={selectClasses}>
                    <DropdownSearchableMenu
                        buttonComponent={buttonComponent}
                        items={searchOptions}
                        currentSelected={selectedOption}
                        keyProp="id"
                        searchPlaceholder="Options..."
                        itemSelectedListener={optionSelectedListener}
                        labelProperty={labelProperty}
                        valueProperty={valueProperty}
                        hideSearch
                        single
                    />
                </div>

            </div>
        </div>
    );
}
