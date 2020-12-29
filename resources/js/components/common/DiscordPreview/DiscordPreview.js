import React from 'react';
import './discord-preview.css';
import { jumboify, parse } from './Markdown';
import {
    BODY_FIELD,
    BODY_IMAGE_FIELD,
    COLOR_FIELD,
    FIELD_FIELD,
    FOOTER_FIELD,
    PLAIN_TEXT_FIELD,
    THUMBNAIL_FIELD,
    TITLE_FIELD,
    TITLE_IMAGE_FIELD,
} from '../../../utils/configs/fieldConfigs';
import Embed from './Embed/Embed';

const DiscordViewWrapper = ({ children }) =>
    // we could actually just flatten the styling out on the respective elements,
    // but copying directly from discord is a lot easier than that
    (
        <div className="w-100 overflow-auto pa2 discord-view">
            <div className="flex-vertical theme-dark">
                <div className="chat flex-vertical flex-spacer">
                    <div className="content flex-spacer flex-horizontal">
                        <div className="flex-spacer flex-vertical messages-wrapper">
                            <div className="scroller-wrap">
                                <div className="scroller messages">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
const previewImage = (file) => {
    if (typeof file === 'string') {
        return file;
    }
    return URL.createObjectURL(file);
};

const getEmbedFromFormData = (formData) => {
    const embed = {
        description: formData[BODY_FIELD.name],
        color: formData[COLOR_FIELD.name],
        author: {
            name: formData[TITLE_FIELD.name],
        },
    };
    if (formData[FOOTER_FIELD.name] instanceof FormData) {
        embed.footer = {
            iconUrl: formData[FOOTER_FIELD.name].get('image')
                ? previewImage(formData[FOOTER_FIELD.name].get('image'))
                : '',
            text: formData[FOOTER_FIELD.name].get('text'),
        };
    }

    if (formData[THUMBNAIL_FIELD.name] instanceof FormData) {
        embed.thumbnail = {
            url: previewImage(formData[THUMBNAIL_FIELD.name].get('image')),
        };
    }

    if (formData[BODY_IMAGE_FIELD.name] instanceof FormData) {
        embed.image = {
            url: previewImage(formData[BODY_IMAGE_FIELD.name].get('image')),
        };
    }

    if (formData[TITLE_IMAGE_FIELD.name] instanceof FormData) {
        embed.author = {
            ...embed.author,
            iconUrl: previewImage(formData[TITLE_IMAGE_FIELD.name].get('image')),
        };
    }

    if (Array.isArray(formData[FIELD_FIELD.name])) {
        embed.fields = formData[FIELD_FIELD.name].map((field) => ({
            name: field.title,
            value: field.value,
            inline: field.inline,
        }));
    }

    return embed;
};

export default function DiscordPreview({ data }) {
    return (
        <div className="w-100 br2 flex flex-column white overflow-hidden bg-discord-dark rounded-preview mt-2">
            <DiscordViewWrapper>
                <div className="message-group hide-overflow">
                    <div className="comment">
                        <div className="message first">
                            <div className="markup">{parse(data[PLAIN_TEXT_FIELD.name], true, {}, jumboify)}</div>
                        </div>
                        <Embed {...getEmbedFromFormData(data)} />
                    </div>
                </div>
            </DiscordViewWrapper>
        </div>
    );
}
