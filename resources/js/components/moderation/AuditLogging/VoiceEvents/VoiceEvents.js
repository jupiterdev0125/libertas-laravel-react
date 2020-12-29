import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import { toggleAuditLoggingCommand } from '../../../../store/moderation/auditLoggingSlice';

export default function VoiceEvents() {
    const voiceEvents = useSelector((state) => state.auditLogging.voiceEvents);
    const dispatch = useDispatch();
    const toggleEventCommand = (commandName) => {
        dispatch(toggleAuditLoggingCommand({
            commandName,
            type: 'voiceEvents',
        }));
    };

    return (
        <>
            <ModerationCardHeader uppercase text="voice events" noButtons />
            <Card className="pt-2 pb-3">
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Joined Voice Channel"
                            checked={voiceEvents.member_joined_voice_channel}
                            valueChangedListener={() => toggleEventCommand('member_joined_voice_channel')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Left Voice Channel"
                            checked={voiceEvents.member_left_voice_channel}
                            valueChangedListener={() => toggleEventCommand('member_left_voice_channel')}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
