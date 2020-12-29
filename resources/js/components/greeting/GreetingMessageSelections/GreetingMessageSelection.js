import React from 'react';
import Selection, { ADD, EDIT } from '../../common/EditorSelection/Selection';
import { MessageTypes } from '../../../pages/Greeting/GreetingPage';

export default function GreetingMessageSelection({ messages, activePanelChangedListener }) {
    const getSelectionIconForMessageType = (messageType) => {
        const typeInMessages = messages.filter((message) => message.type === messageType);
        if (typeInMessages.length === 1 && typeInMessages[0].id !== undefined) {
            return EDIT;
        }

        return ADD;
    };

    return (
        <div className="row m-bot-4 add-buttons">
            <div className="col-md-4 col-lg-4 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1">
                <Selection
                    onClick={() => activePanelChangedListener(MessageTypes.WELCOME)}
                    title="Server welcome"
                    icon={getSelectionIconForMessageType(MessageTypes.WELCOME)}
                />
            </div>
            <div className="col-md-4 col-lg-4 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1">
                <Selection
                    onClick={() => activePanelChangedListener(MessageTypes.DM)}
                    title="DM welcome"
                    icon={getSelectionIconForMessageType(MessageTypes.DM)}
                />
            </div>
            <div className="col-md-4 col-lg-4 col-12 plugin-card sm-m-bot-1 md-m-bot-1 lg-m-bot-1 ">
                <Selection
                    onClick={() => activePanelChangedListener(MessageTypes.GOODBYE)}
                    title="Server goodbye"
                    icon={getSelectionIconForMessageType(MessageTypes.GOODBYE)}
                />
            </div>
        </div>
    );
}
