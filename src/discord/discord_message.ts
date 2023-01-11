import {DiscordRequest} from "../discord_request";
import {HtmlMethod} from "../enums";
import {Message} from "./interaction";

export async function SendMessage(channelId: string, message: Message) {
    return await DiscordRequest({
        endpoint: `channels/${channelId}/messages`,
        method: HtmlMethod.POST,
        body: message,
    })
}