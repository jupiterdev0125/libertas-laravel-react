import React from 'react';
import classnames from 'classnames';
import { useValidation } from '../../../customHooks/useValidation';
import FailedValidation from '../../common/validation/FailedValidation/FailedValidation';
import './command_name_input.css';

export default function CommandNameInput({
    commandPrefix,
    commandName,
    prefixChangedListener,
    nameChangedListener,
    validationIssues,
    validationPrefixKey,
    validationKey,
    light,
}) {
    const [prefixValid] = useValidation(validationIssues, validationPrefixKey);
    const [valid] = useValidation(validationIssues, validationKey);

    const inputClasses = classnames('form-control input-min-height', {
        'input-text-light-dark': light,
        'input-text-dark': !light,
    });
    const onPrefixChange = (e) => {
        prefixChangedListener(e.target.value);
    };
    const onNameChange = (e) => {
        nameChangedListener(e.target.value);
    };
    return (
        <div className="container">
            {
                (!valid || !prefixValid) && (
                    <>
                        <div className="row">
                            <FailedValidation message="Please write a value." />
                        </div>
                    </>
                )
            }
            <div className="row">
                <div className="col-3 command-prefix ">
                    <input
                        type="text"
                        className={inputClasses}
                        value={commandPrefix}
                        onChange={onPrefixChange}
                        placeholder="Prefix"
                        maxLength="5"
                    />
                </div>
                <div className="col-9 command-name">
                    <input
                        type="text"
                        className={inputClasses}
                        value={commandName || ''}
                        onChange={onNameChange}
                        placeholder="Name"
                        maxLength="30"
                    />
                </div>
            </div>
        </div>
    );
}
