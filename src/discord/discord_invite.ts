import {DiscordRequest} from "../discord_request";
import {HtmlMethod} from "../enums";
import {Response} from "node-fetch";

export async function CreateDiscordInvite(channelId: string, maxAge: number, maxUses: number): Promise<Response> {
    return await DiscordRequest({
        endpoint: `channels/${channelId}/invites`,
        method: HtmlMethod.POST,
        body: {
            max_age: maxAge,
            max_uses: maxUses,
        }
    })
}