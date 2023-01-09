import * as admin from "firebase-admin"
import {Command} from "../types/command";
import {createPlayerFromUser} from "./join";

const {InteractionResponseType} = require("discord-interactions");

const NewCommand: Command = {
    data: {
        name: 'new',
        description: 'Create and join a new game.',
    },
    async execute(interaction, gameState) {
        const db = admin.database()
        gameState = {
            started: false,
            events: [],
            players: {
                [interaction.member!.user.id]: createPlayerFromUser(interaction.member!.user)
            },
            phaseCount: -1,
            everyEvents: {night: {}, discussion: {}, voting: {}},
        }
        await db.ref('games').child(interaction.channel_id).set(gameState)
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Game created. Send </join:1059832746698092694> to join.`, // todo add info about game (players, createTime, etc)
            },
        }
    }
}

export default NewCommand
// const {InteractionResponseType} = require("discord-interactions");
//
// const admin = require("firebase-admin");
// const {ApplicationCommandOptionType} = require("../enums");
//
// module.exports = {
//     data: {
//         name: 'new',
//         description: 'Creates a new game.',
//     },
//     async execute(interaction, gameState) {
//         // const db = admin.database()
//         // await db.ref('test').set(interaction.data)
//         // // todo: create game on db with channel id
//         return {
//             type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
//             data: {
//                 content: `Game created. Send </join:1059832746698092694> to join.`,
//             },
//         }
//     }
// }
// // todo: create game on db with channel id
