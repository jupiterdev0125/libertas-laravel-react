import React from 'react';
import Selection from '../../common/EditorSelection/Selection';
import {
    SINGLE_TIMED_MESSAGE_CONFIG,
    RANDOM_TIMED_MESSAGE_CONFIG
} from '../../../pages/TimedMessageConfig';

export default function GreetingMessageSelection({ activePanelChangedListener }) {

    return (
        <div className="row m-bot-4 add-buttons">
            <div className="col-md-6 col-lg-6 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1">
                <Selection
                    onClick={() => activePanelChangedListener(SINGLE_TIMED_MESSAGE_CONFIG)}
                    title="single"
                />
            </div>
            <div className="col-md-6 col-lg-6 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1">
                <Selection
                    onClick={() => activePanelChangedListener(RANDOM_TIMED_MESSAGE_CONFIG)}
                    title="random"
                />
            </div>
        </div>
    );
}
