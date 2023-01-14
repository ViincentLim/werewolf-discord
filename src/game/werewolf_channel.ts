import {GameState} from "./game";
import {CreateChannel, DeleteChannel} from "../discord/discord_channel";
import {wwGuildId} from "./game_constants";
import {ChannelType, HtmlMethod, PermissionFlags} from "../enums";
import {CreateDiscordInvite} from "../discord/discord_invite";
import {DiscordRequest} from "../discord/discord_request";
import {wwChannelPath} from "../firebase/firebase_setup";

export async function createWerewolfChannel(gameChannelId: string, gameState: GameState) {
    const channel = (await (await CreateChannel(wwGuildId, {
        name: `Werewolf Chat ${gameChannelId}`,
        type: ChannelType.GUILD_TEXT,
        topic: "This channel is for communication between werewolves at night. Every night, you can discuss and vote who to kill. In the day, the channel would be unavailable.",
        permission_overwrites: [
            {
                id: wwGuildId,
                type: 0,
                deny: PermissionFlags.VIEW_CHANNEL,
            },
        ]
    })).json())
    gameState.wwChannel = String(channel.id)
    const promises: Promise<any>[] = []
    promises.push(wwChannelPath.child(gameState.wwChannel).set(gameChannelId))
    promises.push(new Promise<void>(async resolve => {
        gameState.wwInvite = (await (await CreateDiscordInvite(gameState.wwChannel!, 6000, 0)).json()).code
        resolve()
    }))
    await createWerewolfGuildRole(gameState)
    await addUsersToWerewolfGuild(gameState, gameState.werewolves || [])
    await Promise.all(promises)
}

async function createWerewolfGuildRole(gameState: GameState) {
    return gameState.wwGuildRole = (await (await DiscordRequest({
        endpoint: `guilds/${wwGuildId}/roles`,
        method: HtmlMethod.POST,
        body: {
            name: "Werewolves",
        }
    })).json()).id
}
async function deleteWerewolfGuildRole(gameState: GameState) {
    return await DiscordRequest({
        endpoint: `guilds/${wwGuildId}/roles/${gameState.wwGuildRole}`,
        method: HtmlMethod.DELETE,
    })
}

async function addUsersToWerewolfGuild(gameState: GameState, users: string[]) {
    const addGuildMemberPromises: Promise<any>[] = []
    console.log('users'+users)
    for (const user of users) {
        addGuildMemberPromises.push(
            DiscordRequest({
                endpoint: `guilds/${wwGuildId}/members/${user}`,
                method: HtmlMethod.POST,
                body: {
                    roles: [gameState.wwGuildRole],
                }
            })
        )
    }
    await Promise.all(addGuildMemberPromises)
    // Allow permission to view werewolf channel
}

async function removeUsersFromWerewolfGuild(gameState: GameState, users: string[]) {
    const removeGuildMemberPromises: Promise<any>[] = []
    for (const user of users) {
        removeGuildMemberPromises.push(
            DiscordRequest({
                endpoint: `guilds/${wwGuildId}/members/${user}/roles/${gameState.wwGuildRole}`,
                method: HtmlMethod.DELETE,
            })
        )
    }
    await Promise.all(removeGuildMemberPromises)

    await deleteWerewolfGuildRole(gameState)
}

export async function deleteWerewolfChannel(gameState: GameState) {
    const allDeletePromises: Promise<any>[] = []
    allDeletePromises.push(deleteWerewolfGuildRole(gameState))
    allDeletePromises.push(removeUsersFromWerewolfGuild(gameState, gameState.werewolves || []))
    allDeletePromises.push(DiscordRequest({endpoint: `invites/${gameState.wwInvite}`, method: HtmlMethod.DELETE}))
    await Promise.all(allDeletePromises)
    return await DeleteChannel(gameState.wwChannel||"")
}