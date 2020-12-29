import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import { toggleAuditLoggingCommand } from '../../../../store/moderation/auditLoggingSlice';

export default function ServerEvents() {
    const serverEvents = useSelector((state) => state.auditLogging.serverEvents);
    const dispatch = useDispatch();
    const toggleEventCommand = (commandName) => {
        dispatch(toggleAuditLoggingCommand({
            commandName,
            type: 'serverEvents',
        }));
    };

    return (
        <>
            <ModerationCardHeader uppercase text="server events" noButtons />
            <Card className="pt-2 pb-3">
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Server Edited"
                            checked={serverEvents.server_edited}
                            valueChangedListener={() => toggleEventCommand('server_edited')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Emoji Updated"
                            checked={serverEvents.emoji_updated}
                            valueChangedListener={() => toggleEventCommand('emoji_updated')}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
