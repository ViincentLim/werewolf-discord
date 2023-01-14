import {DiscordRequest} from "./discord_request";
import {ChannelType, HtmlMethod} from "../enums";

export async function CreateChannel(guildId: string, channel: {name: string, type: ChannelType, topic: string, permission_overwrites: {}[]}) {
    // const channel = {
    //     name: `Werewolf Chat ${guildId}`,
    //     type: ChannelType.GUILD_TEXT,
    //     topic: "This channel is for communication between werewolves at night. Every night, you can discuss and vote who to kill. In the day, the channel would be unavailable."
    // };
    return await DiscordRequest({
        endpoint: `guilds/${guildId}/channels`,
        method: HtmlMethod.POST,
        body: channel
    })
}

export async function DeleteChannel(channelId: string) {
    return await DiscordRequest({
        endpoint: `channels/${channelId}`,
        method: HtmlMethod.DELETE,
    })
}