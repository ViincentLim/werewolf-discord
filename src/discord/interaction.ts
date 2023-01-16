import {InteractionResponseFlags, InteractionResponseType, InteractionType} from "discord-interactions";
import {ApplicationCommandOptionType, ApplicationCommandType, ChannelType} from "../enums";

export type Interaction = {
    id:	string
    application_id: string
    type: InteractionType
    data: InteractionData
    guild_id?: string
    channel_id: string
    member?: GuildMember//guild member object
    user?: DiscordUser//user object
    token: string
    version: number
    message?: {user: DiscordUser}//message object
    app_permissions?: string
    locale?: string
    guild_locale?: string
}

export type InteractionData = {
    id: string
    name: string
    type: ApplicationCommandType
    resolved?: any
    options?: ApplicationCommandInteractionDataOption[]
    guild_id?: string
    target_id?: string
}

// the one received by server
export type ApplicationCommandInteractionDataOption = {
    name: string
    type: ApplicationCommandOptionType
    value?: string|number|boolean
    options?: ApplicationCommandInteractionDataOption[]
    focused?: boolean
}

// the one sent by server
export type ApplicationCommandOption = {
    name: string
    description: string
    type: ApplicationCommandOptionType
    required?: boolean
    choices?: ApplicationCommandOptionChoice[]
    options?: ApplicationCommandOption[]
    channel_types?: ChannelType[]
    autocomplete?: boolean
}

export type ApplicationCommandOptionChoice = {
    name: string
    value: string | number
}

export type GuildMember = {
    user: DiscordUser
}

export type DiscordUser = {
    id: string
    username: string
    discriminator: string
    avatar?: string
    bot?: boolean
    system?: boolean
    mfa_enabled?: boolean
    banner?: string
    accent_color?: number
    locale?: string
    verified?: boolean
    email?: string
    flags?:	number
    premium_type?: number
    public_flags?: number
}

export type InteractionResponse = {
    type: InteractionResponseType
    data: Message
}

// todo: replace all the any types
export type Message = {
    tts?: boolean
    content?: string
    embeds?: any[]//array of embeds
    allowed_mentions?: any//allowed mentions
    flags?: InteractionResponseFlags//MessageFlags
    components?: any[]//array of components
    attachments?: any[]//array of partial attachment objects
}

export type SelectOption = {
    label: string
    value: string
    description?: string
    emoji?: DiscordEmoji
    default?: boolean
}

export type DiscordEmoji = {
    id: string
    name: string
    animated: boolean
}

// export type InteractionCallback = {
//     tts?: boolean
//     content?: string
//     embeds?: any[]//array of embeds
//     allowed_mentions?: any//allowed mentions
//     flags?: InteractionResponseFlags//MessageFlags
//     components?: any[]//array of components
//     attachments?: any[]//array of partial attachment objects
// }