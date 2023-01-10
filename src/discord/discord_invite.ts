import {DiscordRequest} from "../discord_request";
import {HtmlMethod} from "../enums";

export async function CreateDiscordInvite(channelId: string, maxAge: number, maxUses: number) {
    return await DiscordRequest({
        endpoint: `channels/${channelId}/invites`,
        method: HtmlMethod.POST,
        body: {
            max_age: maxAge,
            max_uses: maxUses,
        }
    })
}