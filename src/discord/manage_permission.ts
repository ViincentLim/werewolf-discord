import {DiscordRequest} from "../discord_request";
import {HtmlMethod} from "../enums";

export async function EditPermission({allow, deny, guildId, channelId, userId}: {allow?: number, deny?: number, guildId: string, channelId: string, userId?: string}) {
    let id, type;
    if (userId) {
        id = userId // user id
        type = 1 // user
    } else {
        id = guildId // @everyone
        type = 0 // role
    }
    return await DiscordRequest({
        endpoint: `channels/${channelId}`,
        method: HtmlMethod.PATCH,
        body: {
            permission_overwrites: [
                {
                    id: id,
                    type: type,
                    allow: allow,
                    deny: deny,
                },
            ]
        }
    })
}
// export async function EditSendMessagePermission({allow, guildId, channelId, userId}: {allow: boolean, guildId: string, channelId: string, userId?: string}) {
//     let id, type;
//     if (userId) {
//         id = userId // user id
//         type = 1 // user
//     } else {
//         id = guildId // @everyone
//         type = 0 // role
//     }
//     return await DiscordRequest({
//         endpoint: `channels/${channelId}`,
//         method: HtmlMethod.PATCH,
//         body: {
//             permission_overwrites: [
//                 {
//                     id: id,
//                     type: type,
//                     [allow ? "allow" : "deny"]: PermissionFlags.SEND_MESSAGES,
//                 },
//             ]
//         }
//     })
// }
// export async function EditViewChannelPermission({allow, guildId, channelId, userId}: {allow: boolean, guildId: string, channelId: string, userId?: string}) {
//     let id, type;
//     if (userId) {
//         id = userId // user id
//         type = 1 // user
//     } else {
//         id = guildId // @everyone
//         type = 0 // role
//     }
//     return await DiscordRequest({
//         endpoint: `channels/${channelId}`,
//         method: HtmlMethod.PATCH,
//         body: {
//             permission_overwrites: [
//                 {
//                     id: id,
//                     type: type,
//                     [allow ? "allow" : "deny"]: PermissionFlags.VIEW_CHANNEL,
//                 },
//             ]
//         }
//     })
// }
// export async function AllowViewChannelPermission({guildId, channelId, userId}: {guildId: string, channelId: string, userId?: string}) {
//     let id, type;
//     if (userId) {
//         id = userId // user id
//         type = 1 // user
//     } else {
//         id = guildId // @everyone
//         type = 0 // role
//     }
//     return await DiscordRequest({
//         endpoint: `channels/${channelId}`,
//         method: HtmlMethod.PATCH,
//         body: {
//             permission_overwrites: [
//                 {
//                     id: id,
//                     type: type,
//                     allow: PermissionFlags.VIEW_CHANNEL,
//                 },
//             ]
//         }
//     })
// }