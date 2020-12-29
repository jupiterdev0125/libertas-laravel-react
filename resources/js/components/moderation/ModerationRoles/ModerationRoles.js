import React, { Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { selectCurrentModerationRoles, updateModerationRoles } from '../../../store/moderation/moderationRolesSlice';
import AutoRole from '../../common/editor_inputs/inputs/AutoRole/AutoRole';
import ConfigContext from '../../../context/ConfigContext';

export default function ModerationRoles() {
    const selectedItems = useSelector(selectCurrentModerationRoles);
    const configContext = useContext(ConfigContext);
    const dispatch = useDispatch();

    const changeValue = (value) => {
        dispatch(updateModerationRoles(value));
    };

    return (
        <>
            <SectionHeader noBottomMargins title="moderation roles" />
            <div className="row">
                <small className="col-12 col-md-10 pb-2 moderation-role-text text-center text-md-left">
                    Users with one of these roles are considered your server moderators and are not affected by
                    Auto-Moderator, they are also immune to moderator commands. Moderator roles do not allow the use of
                    moderator commands, you must add your moderator role as an "allowed role" inside each command by
                    clicking on the command name.
                </small>
            </div>
            <AutoRole
                guildId={configContext.config.guildId}
                value={selectedItems}
                setValue={changeValue}
            />
        </>
    );
}
