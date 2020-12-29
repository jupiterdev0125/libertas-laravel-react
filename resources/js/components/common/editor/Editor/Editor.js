import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { validateGlobalCharCount } from '../../../../utils/validation/globalCharCountValidator';
import { renderSubmissionStatusSpan } from '../../../../utils/editorHelpers';
import { fireErrorToast } from '../../../../utils/toastUtils';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './embed-editor.css';

export default function Editor({
    activePanelComponent,
    performSubmission,
    values,
    submissionStatus,
    deleteData,
    resetForm,
}) {
    const [globalCharLimitReached, isGlobalCharLimitReached] = useState(false);
    const customUI = ({ onClose, type, func }) => (
        <div className="custom-ui">
            <h1 className="text-uppercase">{`confirm ${type}`}</h1>
            <p>
                {`Are you sure to ${type} current command?`}
            </p>
            <button
                type="button"
                className="btn m-1 btn-enabled"
                onClick={() => {
                    func();
                    onClose();
                }}
            >
                Yes
            </button>
            <button type="button" className="btn m-1 btn-disabled" onClick={onClose}>No</button>
        </div>
    );

    useEffect(() => {
        validateGlobalCharCount(values, isGlobalCharLimitReached);
    }, [values]);

    useEffect(() => {
        if (globalCharLimitReached) {
            fireErrorToast('Global character limit of 6000 reached!');
        }
    }, [globalCharLimitReached]);

    const confirmReset = () => {
        confirmAlert({
            customUI: ({ onClose }) => customUI({ onClose, type: 'reset', func: resetForm }),
        });
    };

    const confirmDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => customUI({ onClose, type: 'delete', func: deleteData }),
        });
    };

    return (
        <div className="container">
            {activePanelComponent && (
                <>
                    <div className="embed-editor">
                        <div className="embed-fields-heading">
                            <h2>Elements</h2>
                        </div>
                        <div>{/** spacer */}</div>
                        <div className="discord-preview-heading">
                            <h2>Live Embed example</h2>
                        </div>
                        {activePanelComponent}
                    </div>
                    <div className="embed-editor-control m-top-2">
                        <div>{/** spacer */}</div>
                        <button type="button" className="btn btn-enabled" onClick={performSubmission}>
                            Save
                        </button>
                        {deleteData !== undefined ? (
                            <button type="button" className="btn btn-disabled" onClick={confirmDelete}>
                                Delete
                            </button>
                        ) : (
                            <button
                                className="btn btn-disabled"
                                onClick={confirmReset}
                                type="button"
                            >
                                Reset
                            </button>
                        )}
                        <div>{/** spacer */}</div>
                    </div>
                    <div className="text-center m-bot-4 m-top-1">
                        {renderSubmissionStatusSpan(submissionStatus)}
                    </div>
                </>
            )}
        </div>
    );
}
