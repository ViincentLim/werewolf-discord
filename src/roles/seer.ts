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

import {Aura, getRole, Role, RoleName, TeamName} from "../game/game_role";
import {Phase} from "../game/game";
import {actionComparatorLess} from "../game/phase_events";

const seer: Role = {
    init(): void {},
    // playerId: "",
    name: RoleName.seer,
    description: "Every night, you can /check if a player is good, evil or unknown. You win with the villager team.",
    team: TeamName.villager,
    aura: Aura.good,
    check: (gameState, id, params) => {
        const player1Id = params.player1;
        const player1 = gameState.players[player1Id];
        if (gameState.phase?.[0] === Phase.night) {
            let player1RoleName: any;
            const appears = [...(gameState.everyEvents?.night.appears?.[player1Id] || []), ...(gameState.events?.[gameState.phaseCount].appears?.[player1Id] || [])].sort(actionComparatorLess)
            // todo: trigger appear successful effect
            player1RoleName = appears[0] || player1?.fakeRole || player1?.role;
            if (player1RoleName) {
                return `${player1.name} is ${getRole(player1RoleName).aura}`
            }
        }
        return `Error checking ${player1.name}`
    }
}
export default seer