import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import { toggleAuditLoggingCommand } from '../../../../store/moderation/auditLoggingSlice';

export default function RoleEvents() {
    const roleEvents = useSelector((state) => state.auditLogging.roleEvents);
    const dispatch = useDispatch();
    const toggleEventCommand = (commandName) => {
        dispatch(toggleAuditLoggingCommand({
            commandName,
            type: 'roleEvents',
        }));
    };

    return (
        <>
            <ModerationCardHeader uppercase text="role events" noButtons />
            <Card className="pt-2 pb-3">
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Role Created"
                            checked={roleEvents.role_created}
                            valueChangedListener={() => toggleEventCommand('role_created')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Role Updated"
                            checked={roleEvents.role_updated}
                            valueChangedListener={() => toggleEventCommand('role_updated')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Role Deleted"
                            checked={roleEvents.role_deleted}
                            valueChangedListener={() => toggleEventCommand('role_deleted')}
                        />
                    </div>
                </div>
                <div className="row pl-3 pr-3 mt-2">
                    <div className="col-12 col-lg-4">
                        <RadioButton
                            label="Member Role Updated"
                            checked={roleEvents.member_role_updated}
                            valueChangedListener={() => toggleEventCommand('member_role_updated')}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
