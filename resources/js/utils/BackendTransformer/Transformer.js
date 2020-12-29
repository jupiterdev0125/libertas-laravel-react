const transformChannel = (channelId) => {
    if (channelId !== '' && channelId) {
        return {
            id: channelId,
        };
    }

    return undefined;
};

const transformRoles = (roles) => {
    if (roles) {
        return JSON.parse(roles).map((role) => ({
            id: role,
        }));
    }

    return undefined;
};

const getImageFormData = (imagePath) => {
    if (!imagePath) {
        return undefined;
    }

    const formData = new FormData();
    formData.set('image', imagePath.replace('public/', '/storage/'));

    return formData;
};

const getFooterFromEmbed = (embed) => {
    if (!embed.footer) {
        return undefined;
    }

    const footer = new FormData();
    let dataSet = false;
    if (embed.footer.text) {
        footer.set('text', embed.footer.text);
        dataSet = true;
    }
    const footerImage = getImageFormData(embed.footer?.icon_url);
    if (footerImage !== undefined) {
        footer.set('image', footerImage.get('image'));
        dataSet = true;
    }

    if (dataSet) {
        return footer;
    }
    return undefined;
};

export const transformDefaultEmbed = (responseEmbed) => {
    const embed = {};
    Object.keys(responseEmbed).forEach((embedKey) => {
        if (responseEmbed[embedKey] !== null) {
            embed[embedKey] = responseEmbed[embedKey];
        }
    });

    return {
        id: embed.id,
        plainText: embed.plain_text,
        title: embed.author?.name || undefined,
        body: embed.description,
        field: embed.fields?.map((field) => ({
            title: field.name,
            value: field.value,
            inline: field.inline === 'true',
        })),
        thumbnail: getImageFormData(embed.thumbnail?.url),
        titleImage: getImageFormData(embed.author?.icon_url),
        bodyImage: getImageFormData(embed.image?.url),
        footer: getFooterFromEmbed(embed),
        color: embed.color ? `#${embed.color.toString(16)}` : undefined,
    };
};

const transformPermissions = (allowedRoles, bannedRoles) => {
    if (!!allowedRoles || !!bannedRoles) {
        return {
            allowed: transformRoles(allowedRoles),
            banned: transformRoles(bannedRoles),
        };
    }

    return undefined;
};

export const transformTimedMessage = (timedMessage) => ({
    id: timedMessage.id,
    type: timedMessage.type,
    name: timedMessage.name,
    responses: timedMessage.responses.map((response) => ({
        messageName: timedMessage.name,
        messageId: timedMessage.id,
        channel: transformChannel(timedMessage.channel_id),
        interval: timedMessage.interval,
        ...transformDefaultEmbed(response.embed),
    })),
});

export const transformTwitter = (twitter) => ({
    id: twitter.id,
    name: twitter.twitter_username,
    responses: [
        {
            twitter: twitter.twitter_username,
            channel: transformChannel(twitter.channel_id),
            ...transformDefaultEmbed(twitter.embed),
        },
    ],
});

export const transformReddit = (reddit) => ({
    id: reddit.id,
    name: reddit.subreddit,
    responses: [
        {
            reddit: reddit.subreddit,
            channel: transformChannel(reddit.channel_id),
            ...transformDefaultEmbed(reddit.embed),
        },
    ],
});

export const transformTwitch = (twitch) => ({
    id: twitch.id,
    name: twitch.username,
    responses: [
        {
            twitch: twitch.username,
            channel: transformChannel(twitch.channel_id),
            ...transformDefaultEmbed(twitch.embed),
        },
    ],
});

export const transformYoutube = (youtube) => ({
    id: youtube.id,
    name: youtube.youtube_id,
    responses: [
        {
            youtube: youtube.youtube_id,
            channel: transformChannel(youtube.channel_id),
            ...transformDefaultEmbed(youtube.embed),
        },
    ],
});

export const transformTiktok = (tiktok) => ({
    id: tiktok.id,
    name: tiktok.tiktok,
    responses: [
        {
            tiktok: tiktok.tiktok,
            channel: transformChannel(tiktok.channel_id),
            ...transformDefaultEmbed(tiktok.embed),
        },
    ],
});

const transformDisplayHelp = (displayHelp) => {
    if (displayHelp) {
        return {
            id: displayHelp,
        };
    }
    return undefined;
};

const transformCooldown = (cooldown) => {
    if (cooldown) {
        return {
            id: cooldown,
        };
    }
    return undefined;
};

const transformBannedChannel = (channels) => {
    if (channels) {
        return JSON.parse(channels).map((channel) => transformChannel(channel));
    }
    return undefined;
};

export const transformCommand = (command) => {
    if (command.type === 'auto-role' && (!command.responses || command.responses.length === 0)) {
        command.responses = [{ embed: {} }];
    }
    const roles = transformRoles(command.roles);

    return {
        id: command.id,
        type: command.type,
        static: {
            role: roles,
            roleAction: !!command.role_action,
            name: command.invocation,
            prefix: command.prefix,
            deleteCommandUsage: {
                deleteCommandUsage: !!command.delete_command_usage,
                dcuPeriodCount: command.delete_usage_period_count,
                dcuPeriod: command.delete_usage_period,
            },
            deleteCommandResponse: {
                deleteCommandResponse: !!command.delete_command_response,
                dcrPeriodCount: command.delete_response_period_count,
                dcrPeriod: command.delete_response_period,
            },
            cooldown: {
                cooldown: transformCooldown(command.cooldown),
                periodCount: command.cooldown_period_count,
                period: command.cooldown_period,
            },
            displayHelp: transformDisplayHelp(command.display_help),
            responseChannel: transformChannel(command.response_channel),
            bannedChannel: transformBannedChannel(command.banned_channel),
            messageType: JSON.parse(command.message_type),
            permissions: transformPermissions(command.allowed_roles, command.banned_roles),
        },
        responses: command.responses.map((response) => ({
            ...transformDefaultEmbed(response.embed),
        })),
    };
};
export const transformMessage = (message) => ({
    type: message.type,
    id: message.id,
    embed: {
        ...transformDefaultEmbed(message.embed),
        role: transformRoles(message.roles),
        channel: transformChannel(message.channel_id),
    },
});
