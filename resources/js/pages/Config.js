export const getBaseConfigFromElement = (element) => {
    if (element) {
        return {
            guildId: element.dataset.guild_id,
            guildName: element.dataset.guild_name,
            csrfToken: element.dataset.csrf_token,
            isPremium: element.dataset.is_premium === 'true',
            hasAdvancedEmbeds: element.dataset.has_advanced_embeds === 'true',
            isPluginEnabled: element.dataset.plugin_enabled === 'true',
        };
    }

    return {};
};
