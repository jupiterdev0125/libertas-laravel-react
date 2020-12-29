import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import AddAutomatedActionButton from './AddAutomatedActionButton/AddAutomatedActionButton';
import AutomatedAction from './AutomatedAction/AutomatedAction';
import { voidListener } from '../../../utils/staticValuesUtil';
import { addAction, selectActions } from '../../../store/moderation/automatedActions';

export default function AutomatedActions() {
    const dispatch = useDispatch();
    const actions = useSelector(selectActions);

    const addAnAction = () => {
        dispatch(addAction());
    };
    console.log(actions);
    return (
        <>
            <SectionHeader title="Automated Actions" withHelpIcon />
            <AddAutomatedActionButton addActionListener={addAnAction} />
            {
                actions.map((action) => (
                    <AutomatedAction key={action.id} action={action} deleteActionListener={voidListener} saveActionListener={voidListener} />
                ))
            }
        </>
    );
}
