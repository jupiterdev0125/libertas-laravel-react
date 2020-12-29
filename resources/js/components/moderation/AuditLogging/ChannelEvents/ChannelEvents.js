import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import { toggleAuditLoggingCommand } from '../../../../store/moderation/auditLoggingSlice';

export default function ChannelEvents() {
    const channelEvents = useSelector((state) => state.auditLogging.channelEvents);
    const dispatch = useDispatch();
    const toggleEventCommand = (commandName) => {
        dispatch(toggleAuditLoggingCommand({
            commandName,
            type: 'channelEvents',
        }));
    };

    return (
        <>
            <ModerationCardHeader uppercase text="channel events" noButtons />
            <Card className="pt-2 pb-3">
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Channel Created"
                            checked={channelEvents.channel_created}
                            valueChangedListener={() => toggleEventCommand('channel_created')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Channel Updated"
                            checked={channelEvents.channel_updated}
                            valueChangedListener={() => toggleEventCommand('channel_updated')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Channel Deleted"
                            checked={channelEvents.channel_deleted}
                            valueChangedListener={() => toggleEventCommand('channel_deleted')}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
