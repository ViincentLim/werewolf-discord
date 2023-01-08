export const enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,	//Any integer between -2^53 and 2^53
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7, // Includes all channel types + categories
    ROLE = 8,
    MENTIONABLE = 9, // Includes users and roles
    NUMBER = 10, // Any double between -2^53 and 2^53
    ATTACHMENT = 11, // attachment object
}

export const enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3,
}

// export const enum MessageFlags {
//     SUPPRESS_EMBEDS = 1 << 2,
//     EPHEMERAL = 1 << 6
// }

export const enum HtmlMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15,
}

// export const enum InteractionCallbackType {
//     PONG = 1,
//     CHANNEL_MESSAGE_WITH_SOURCE = 4,
//     DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE5,
//     DEFERRED_UPDATE_MESSAGE = 6,
//     UPDATE_MESSAGE = 7,
//     APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
//     MODAL = 9
//
// }