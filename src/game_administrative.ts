// // In this private server, werewolves are added at the start of the game for discussion
// // They are only added to 1 private channel
// // At the end of game, werewolves added are removed
// // Channel created is deleted

// import {DiscordRequest} from "./discord_request";
// import {HtmlMethod, PermissionFlags} from "./enums";
import {EditPermission} from "./discord/manage_permission";
import {PermissionFlags} from "./enums";

let guildId = "1062251357769310298";
// DiscordRequest({
//     endpoint: `guilds/${guildId}/channels`,
//     method: HtmlMethod.GET,
// }).then(async res => {
//     const channels = await res.json();
//     console.log(channels.filter((c: any) => c.type === ChannelType.GUILD_TEXT)[0].name)
// })
main()

async function main() {
    // const channelId = "1062251357769310301"
    // const channelId_generalText = "1062251357769310301"
    // const channelId_GeneralVoice = "1062251357769310302"
    // const channelId_welcome = "1062267500601024542"
    // await DiscordRequest({
    //     endpoint: `channels/${channelId_welcome}`,
    //     method: HtmlMethod.PATCH,
    //     body: {
    //         permission_overwrites: [
    //             {
    //                 id: guildId,//@everyone
    //                 type: 0,
    //                 // allow: PermissionFlags.VIEW_CHANNEL,
    //                 deny: PermissionFlags.SEND_MESSAGES,
    //             },
    //         ]
    //         // id: "1062251357769310301"
    //     }
    // })
    // console.log(await (await AllowViewChannelPermission({guildId: guildId, channelId: "1062267500601024542", userId: "1059804790726598717"})).json())
    // console.log(await (await EditPermission({allow:0, deny:0,guildId: guildId, channelId: "1062267500601024542", userId: "1059804790726598717"})).json())
    console.log(await (await EditPermission({deny:PermissionFlags.SEND_MESSAGES, guildId: guildId, channelId: "1062267500601024542"})).json())
}
