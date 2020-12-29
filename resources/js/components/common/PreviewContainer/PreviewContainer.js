import React from 'react';
import DiscordPreview from '../DiscordPreview/DiscordPreview';
import embedExampleImage from '../EmbedEditor/Embed_Example_Image.png';
import libertasLogo from './libertas_logo.png';
import './preview-container.css';
import Navigation from '../Navigation/Navigation';

export default function PreviewContainer({
    showShowPreview,
    values,
    multi,
    embedIndex,
    embedValues,
    setEmbedValues,
    setEmbedIndex,
    fieldsToKeepInSync,
    isResponse,
}) {
    return (
        <div className="discord-preview container">
            <div className="row">
                <div className="col-2 preview-logo">
                    <img alt="Embed log" src={libertasLogo} />
                </div>
                <div className="col-12 col-sm-10">
                    <div className="row d-flex align-items-center">
                        <span className="preview-libertas-title">Libertas</span>
                        <span className="libertas-bot-label">BOT</span>
                        <small className="libertas-time">Today at 10:41 pm</small>
                    </div>
                    <div className="row align-items-start">
                        {showShowPreview ? (
                            <DiscordPreview data={values} />
                        ) : (
                            <img className="preview-image" alt="Embed example" src={embedExampleImage} />
                        )}
                        {multi && (
                            <Navigation
                                embedIndex={embedIndex}
                                setEmbedIndex={setEmbedIndex}
                                embedValues={embedValues}
                                setEmbedValues={setEmbedValues}
                                fieldsToKeepInSync={fieldsToKeepInSync}
                                isResponse={isResponse}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
