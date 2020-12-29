import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import { toggleAuditLoggingCommand } from '../../../../store/moderation/auditLoggingSlice';

export default function MessageEvents() {
    const messageEvents = useSelector((state) => state.auditLogging.messageEvents);
    const dispatch = useDispatch();
    const toggleEventCommand = (commandName) => {
        dispatch(toggleAuditLoggingCommand({
            commandName,
            type: 'messageEvents',
        }));
    };

    return (
        <>
            <ModerationCardHeader uppercase text="message events" noButtons />
            <Card className="pt-2 pb-3">
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Message Updated"
                            checked={messageEvents.message_updated}
                            valueChangedListener={() => toggleEventCommand('message_updated')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Message Deleted"
                            checked={messageEvents.message_deleted}
                            valueChangedListener={() => toggleEventCommand('message_deleted')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Invite Posted"
                            checked={messageEvents.invite_posted}
                            valueChangedListener={() => toggleEventCommand('invite_posted')}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
