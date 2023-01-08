import {Command} from "../types/command";
import {Interaction} from "../types/interaction";
import {GameState} from "../types/game/game";
import {InteractionResponseFlags} from "discord-interactions";
import {RoleDescription} from "../types/game/game_role";

const {InteractionResponseType} = require("discord-interactions");

const RoleCommand: Command = {
    data: {
        name: 'role',
        description: 'Retrieve your role.',
    },
    async execute(interaction: Interaction, gameState: GameState) {
        if (!gameState.started) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Game has not started. Please use </start> to start the game.`,
                    flags: InteractionResponseFlags.EPHEMERAL
                },
            }
        }
        const player = gameState.players[interaction.member?.user.id || ""]
        if (!player) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `You did not join the game.`,
                    flags: InteractionResponseFlags.EPHEMERAL
                },
            }
        }
        if (!player.role) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `You do not have a role.`,
                    flags: InteractionResponseFlags.EPHEMERAL
                },
            }
        }
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Your role is ${player.role}.\n\n${RoleDescription[player.role]}`,
                flags: InteractionResponseFlags.EPHEMERAL
            },
        }
    }
}
export default RoleCommand
// module.exports = {
//     data: {
//         name: 'role',
//         description: 'Retrieve your role.',
//     },
//     async execute(interaction) {
//         /*
//         * todo
//         * db
//         * check game started with channel id
//         * check user's role with user id
//         * */
//         const userId = interaction.member?.user?.id
//         const channelId = interaction.channel_id
//         if (!userId || !channelId) {
//             return {
//                 type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
//                 data: {
//                     content: `Error`,
//                     flags: 1 << 6
//                 },
//             }
//         }
//
//         let gameStarted = true; // todo: for dev only
//         if (!gameStarted) {
//             return {
//                 type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
//                 data: {
//                     content: `Game has not started. Please use /start to start the game.`,
//                     flags: 1 << 6
//                 },
//             }
//         }
//         return {
//             type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
//             data: {
//                 content: `Your role is ${"seer"}`,
//                 flags: 1 << 6
//             },
//         }
//     }
// }