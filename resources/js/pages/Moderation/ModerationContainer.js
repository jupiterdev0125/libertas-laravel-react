import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import ModerationRoles from '../../components/moderation/ModerationRoles/ModerationRoles';
import SimpleModeration from '../../components/moderation/SimpleModeration/SimpleModeration';
import AuditLogging from '../../components/moderation/AuditLogging/AuditLogging';
import AutoModeration from '../../components/moderation/AutoModeration/AutoModeration';
import AutomatedActions from '../../components/moderation/AutomatedActions/AutomatedActions';
import ConfigContext from '../../context/ConfigContext';
import { fetchConfigChannels, fetchConfigRoles, setConfig } from '../../store/moderation/configSlice';

export default function ModerationContainer() {
    const configContext = useContext(ConfigContext);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setConfig(configContext.config));
        dispatch(fetchConfigRoles());
        dispatch(fetchConfigChannels());
    }, []);

    return (
        <div className="container m-bot-4">
            <PageHeader config={configContext.config} pageType="moderation" pageTitle="Moderation" />

            <ModerationRoles />
            <SimpleModeration />
            <AuditLogging />
            <AutoModeration />
            <AutomatedActions />
        </div>
    );
}
