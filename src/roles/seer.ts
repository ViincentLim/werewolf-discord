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

import {Role, TeamName} from "../game/game_role";

const seer: Role = {
    init(): void {},
    // playerId: "",
    name: "seer",
    description: "Every night, you can /check if a player is good, evil or unknown. You win with the villager team.",
    hasWwChannelAccess: false,
    team: TeamName.villager
}
export default seer