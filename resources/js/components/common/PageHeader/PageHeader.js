import React, { useContext, useState } from 'react';
import ConfigContext from '../../../context/ConfigContext';

export default function PageHeader({ pageType, pageTitle }) {
    const { config } = useContext(ConfigContext);
    const [pluginEnabled, setPluginEnabled] = useState(config.isPluginEnabled);
    const pluginButtonClass = `btn btn-${pluginEnabled ? 'disabled' : 'enabled'} ml-2`;

    const togglePlugin = async () => {
        fetch(`/plugins/${config.guildId}/${pageType}/toggle`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': config.csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
            },
        }).then(() => setPluginEnabled(!pluginEnabled));
    };

    return (
        <div className="row m-top-bot-4">
            <div className="col-12 col-lg-6 title md-text-center mob-m-bot-1 sm-m-bot-1 md-m-bot-1 m-top-1">
                <h1 style={{ fontWeight: 600 }} className="vertical-middle">
                    {pageTitle}
                </h1>
            </div>
            <div className="col-12 col-lg-6 md-text-center md-m-top-1 lg-my-auto lg-text-right">
                <a href={`/plugins/${config.guildId}`} className="btn btn-plugin">
                    Plugins
                </a>
                <button className={pluginButtonClass} onClick={togglePlugin}>
                    {pluginEnabled ? 'Disable' : 'Enable'}
                </button>
            </div>
        </div>
    );
}
