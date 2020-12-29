import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import { toggleAuditLoggingCommand } from '../../../../store/moderation/auditLoggingSlice';

export default function AutoModerationEvents() {
    const autoModerationEvents = useSelector((state) => state.auditLogging.autoModerationEvents);
    const dispatch = useDispatch();
    const toggleEventCommand = (commandName) => {
        dispatch(toggleAuditLoggingCommand({
            commandName,
            type: 'autoModerationEvents',
        }));
    };

    return (
        <>
            <ModerationCardHeader uppercase text="Auto moderation events" noButtons />
            <Card className="pt-2 pb-3">
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Muted"
                            checked={autoModerationEvents.member_muted}
                            valueChangedListener={() => toggleEventCommand('member_muted')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Unmuted"
                            checked={autoModerationEvents.member_unmuted}
                            valueChangedListener={() => toggleEventCommand('member_unmuted')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Moderation Ban"
                            checked={autoModerationEvents.moderation_ban}
                            valueChangedListener={() => toggleEventCommand('moderation_ban')}
                        />
                    </div>
                </div>
                <div className="row pl-3 pr-3 mt-2">
                    <div className="col-12 col-lg-4">
                        <RadioButton
                            label="Moderation Unban"
                            checked={autoModerationEvents.moderation_unban}
                            valueChangedListener={() => toggleEventCommand('moderation_unban')}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
