import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModerationCardHeader from '../../ModerationCardHeader/ModerationCardHeader';
import Card from '../../../common/Card/Card';
import RadioButton from '../../../common/forms/RadioButton/RadioButton';
import { toggleAuditLoggingCommand } from '../../../../store/moderation/auditLoggingSlice';

export default function MemberEvents() {
    const memberEvents = useSelector((state) => state.auditLogging.memberEvents);
    const dispatch = useDispatch();
    const toggleEventCommand = (commandName) => {
        dispatch(toggleAuditLoggingCommand({
            commandName,
            type: 'memberEvents',
        }));
    };

    return (
        <>
            <ModerationCardHeader uppercase text="member events" noButtons />
            <Card className="pt-2 pb-3">
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Nick Name Changed"
                            checked={memberEvents.nickname_changed}
                            valueChangedListener={() => toggleEventCommand('nickname_changed')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Banned"
                            checked={memberEvents.member_banned}
                            valueChangedListener={() => toggleEventCommand('member_banned')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Joined Server"
                            checked={memberEvents.member_joined_server}
                            valueChangedListener={() => toggleEventCommand('member_joined_server')}
                        />
                    </div>
                </div>
                <div className="row pl-3 pr-3">
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Left Server"
                            checked={memberEvents.member_left_server}
                            valueChangedListener={() => toggleEventCommand('member_left_server')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="Member Unbanned"
                            checked={memberEvents.member_unbanned}
                            valueChangedListener={() => toggleEventCommand('member_unbanned')}
                        />
                    </div>
                    <div className="col-12 col-lg-4 mt-2">
                        <RadioButton
                            label="User Updated"
                            checked={memberEvents.user_updated}
                            valueChangedListener={() => toggleEventCommand('user_updated')}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
