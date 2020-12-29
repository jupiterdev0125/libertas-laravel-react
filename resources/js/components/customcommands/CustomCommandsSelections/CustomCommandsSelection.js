import React, { Fragment } from 'react';
import Selection from '../../common/EditorSelection/Selection';
import {
    FLIPBOOK_COMMAND_CONFIG,
    RANDOM_COMMAND_CONFIG,
    SINGLE_COMMAND_CONFIG,
} from '../../../pages/CustomCommandsConfig';

export default function CustomCommandsSelection({ activePanelChangedListener }) {
    // const {config} = useContext(ConfigContext);

    return (
        <>
            <div className="row m-bot-4 add-buttons">
                <div className="col-md-4 col-lg-4 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1">
                    <Selection
                        onClick={() => activePanelChangedListener(SINGLE_COMMAND_CONFIG)}
                        title="single response"
                    />
                </div>
                <div className="col-md-4 col-lg-4 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1">
                    <Selection
                        onClick={() => activePanelChangedListener(RANDOM_COMMAND_CONFIG)}
                        title="random response"
                    />
                </div>
                <div className="col-md-4 col-lg-4 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1">
                    <Selection
                        onClick={() => activePanelChangedListener(FLIPBOOK_COMMAND_CONFIG)}
                        title="flipbook response"
                    />
                </div>
            </div>
        </>
    );
}
