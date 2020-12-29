import React from 'react';
import EmbedFooter from './EmbedFooter';
import EmbedImage from './EmbedImage';
import EmbedThumbnail from './EmbedThumbnail';
import EmbedFields from './EmbedFields';
import EmbedDescription from './EmbedDescription';
import EmbedAuthor from './EmbedAuthor';
import EmbedColorPill from './EmbedColorPill';

export default function Embed({
    color, author, description, fields, thumbnail, image, footer,
}) {
    return (
        <div className="accessory">
            <div className="embed-wrapper">
                <EmbedColorPill color={color} />
                <div className="embed embed-rich">
                    <div className="embed-content">
                        <div className="embed-content-inner">
                            <EmbedAuthor {...author} />
                            <EmbedDescription content={description} />
                            <EmbedFields fields={fields} />
                        </div>
                        <EmbedThumbnail {...thumbnail} />
                    </div>
                    <EmbedImage {...image} />
                    <EmbedFooter {...footer} />
                </div>
            </div>
        </div>
    );
}
