import {DiscordRequest} from "../discord_request";
import {HtmlMethod} from "../enums";
import {Message} from "./interaction";
import {Response} from "node-fetch";

export async function SendMessage(channelId: string, message: Message): Promise<Response> {
    return await DiscordRequest({
        endpoint: `channels/${channelId}/messages`,
        method: HtmlMethod.POST,
        body: message,
    })
}