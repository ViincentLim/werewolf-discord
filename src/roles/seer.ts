// const {MessageFlags} = require("../enums");
// module.exports = {
//     check: (players, gameState) => {
//         const player = players[0]
//         //todo: if seer has checked, return error
//
//         //todo: if player.alive
//         //todo: player.onCheck()
//         //todo: seer has checked = true
//         return {
//             content: `${playerName} is good 👍, bad 👎, unknown ❓`,
//             flags: MessageFlags.EPHEMERAL,
//         }
//     }
// }

import {Role} from "../game/game_role";

export const seer: Role = {
    init(): void {},
    // playerId: "",
    description: "Every night, you can /check if a player is good, evil or unknown. You win with the villager team.",
}