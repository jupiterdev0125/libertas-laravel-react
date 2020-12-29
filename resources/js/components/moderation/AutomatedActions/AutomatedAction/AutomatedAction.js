import React from 'react';
import { useDispatch } from 'react-redux';
import Card from '../../../common/Card/Card';
import ActionDropdown from './ActionDropdown/ActionDropdown';
import {
    deleteAutomatedAction,
    removeAction,
    saveAutomatedAction,
    updateAction,
} from '../../../../store/moderation/automatedActions';

const generateNumbers = (N) => [...Array(N).keys()].map((i) => i + 1);

export default function AutomatedAction({
    action,
}) {
    const dispatch = useDispatch();

    const availableActionsList = [
        {
            name: 'mute',
            label: 'mute',
        },
        {
            name: 'ban',
            label: 'ban',
        },
        {
            name: 'temp_ban',
            label: 'temp ban',
        },
        {
            name: 'temp_mute',
            label: 'temp mute',
        },
        {
            name: 'kick',
            label: 'kick',
        },
    ];

    const availablePeriods = [
        'minutes',
        'hours',
        'days',
    ];

    const actionTypeChanged = (newType) => {
        dispatch(updateAction({
            ...action,
            action: newType,
        }));
    };

    const actionWarningNumberChanged = (number) => {
        dispatch(updateAction({
            ...action,
            warnings_number: number,
        }));
    };
    const actionPeriodCountChanged = (count) => {
        dispatch(updateAction({
            ...action,
            period_count: count,
        }));
    };
    const actionPeriodChanged = (period) => {
        dispatch(updateAction({
            ...action,
            period,
        }));
    };

    const saveActionListener = (action) => {
        dispatch(saveAutomatedAction(action));
    };

    const deleteActionListener = (action) => {
        if (action.is_new) {
            dispatch(removeAction(action.id));
        } else {
            dispatch(deleteAutomatedAction(action.id));
        }
    };

    return (
        <Card className="p-lg-1 pt-2 pb-2 pt-lg-0 pb-lg-0 automated-action" containerClassNames="d-flex align-items-center flex-wrap">
            <div className="d-flex col-12 col-md-8 align-items-center flex-wrap">
                <ActionDropdown
                    value={action.action}
                    items={availableActionsList}
                    itemSelectedListener={actionTypeChanged}
                    labelProp="label"
                    keyProp="name"
                />
                <div className="pt-2 pt-lg-0">when someone has</div>
                <ActionDropdown
                    value={action.warnings_number}
                    items={generateNumbers(5)}
                    typeText="warnings"
                    itemSelectedListener={actionWarningNumberChanged}
                />
                <div className="pt-2 pt-lg-0">or more in the last</div>
                <ActionDropdown
                    value={action.period_count}
                    items={generateNumbers(60)}
                    itemSelectedListener={actionPeriodCountChanged}
                />
                <ActionDropdown
                    value={action.period}
                    items={availablePeriods}
                    itemSelectedListener={actionPeriodChanged}
                />
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-center pt-2 pt-lg-0">
                <button className="btn btn-enabled mr-2 btn-not-available" onClick={() => saveActionListener(action)}>
                    Save
                </button>
                <button className="btn btn-disabled" onClick={() => deleteActionListener(action)}>
                    Delete
                </button>
            </div>
        </Card>
    );
}
