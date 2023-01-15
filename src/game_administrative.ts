// // In this private server, werewolves are added at the start of the game for discussion
// // They are only added to 1 private channel
// // At the end of game, werewolves added are removed
// // Channel created is deleted

// import {DiscordRequest} from "./discord_request";
// import {HtmlMethod, PermissionFlags} from "./enums";
import {DiscordRequest} from "./discord/discord_request";
import {wwGuildId} from "./game/game_constants";
import {HtmlMethod} from "./enums";
import {DeleteChannel} from "./discord/discord_channel";

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
    // console.log(await (await EditPermission({deny:PermissionFlags.SEND_MESSAGES, guildId: guildId, channelId: "1062267500601024542"})).json())

    // const gameState: GameState = (await gameStatesPath.child("1062677569239011340").get()).val()
    // console.log(await createWerewolfChannel("1062677569239011340", gameState))
    // console.log(gameState)
    // await gameStatesPath.child("1062677569239011340").set(gameState)

    const array: any[] = await
        (await DiscordRequest({
            endpoint: `guilds/${wwGuildId}/channels`,
            method: HtmlMethod.GET
        })).json();
    for (const channel of array.filter(value => value.name.startsWith('werewolf-chat')).map(value => value.id)) {
        console.log(channel)
        console.log(await (await DeleteChannel(channel)).json())
    }
    // console.log(array.filter(value => value.name.startsWith('general')).map(value => value.id))
    // console.log(array.filter(value => value.name.startsWith('werewolf-chat')).map(value => value.permission_overwrites))
    // await EditPermission({
    //     allow: PermissionFlags.ADMINISTRATOR,
    //     channelId: "1062251357769310301",
    //     guildId: wwGuildId,
    //     userId: "964885356170346596",
    // })
    // const roles: any[] = await (await DiscordRequest({
    //     endpoint: `guilds/${wwGuildId}/roles`,
    //     method: HtmlMethod.GET
    // })).json()
    // for (const role of roles) {
    //     try {
    //         console.log(await DiscordRequest({
    //             endpoint: `guilds/${wwGuildId}/roles/${role.id}`,
    //             method: HtmlMethod.DELETE,
    //         }))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // await DeleteChannel()
}