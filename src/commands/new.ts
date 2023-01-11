import * as admin from "firebase-admin"
import {Command} from "../discord/command";
import {createPlayerFromUser} from "./join";
import {joinCommandId} from "../game/game_constants";
import {deleteWerewolfChannel} from "../game/werewolf_channel";

const NewCommand: Command = {
    data: {
        name: 'new',
        description: 'Create and join a new game.',
    },
    async execute(interaction, gameState) {
        const db = admin.database()
        gameState = {
            ended: false, logs: {}, werewolves: [],
            started: false,
            events: [],
            players: {
                [interaction.member!.user.id]: createPlayerFromUser(interaction.member!.user)
            },
            phaseCount: -1,
            everyEvents: {night: {}, discussion: {}, voting: {}}
        }
        if (gameState.wwChannel) {
            await deleteWerewolfChannel(gameState)
        }
        await db.ref('games').child(interaction.channel_id).set(gameState)
        return {
            content: `Game created. Send </join:${joinCommandId}> to join.`, // todo add info about game (players, createTime, etc)
        }
    }
}

export default NewCommand
