import {Aura, Role, RoleName, TeamName} from "../game/game_role";
import {Phase} from "../game/game";
import {allAttackTypes, ProtectType} from "../game/phase_events";

const medic: Role = {
    init(): void {},
    // playerId: "",
    name: RoleName.medic,
    description: "Every night, you can protect a player. If the player gets attacked that night, they will not be killed. You win with the villager team.",
    team: TeamName.villager,
    aura: Aura.good,
    protect: (gameState, id, params) => {
        const player1Id = params.player1
        const lastProtected = gameState.players[id].status?.lastProtected;
        if (!player1Id) {
            removePreviousProtection()
            return "You have removed your protection tonight."
        }
        const player1 = gameState.players[player1Id]
        if (gameState.phase?.[0] !== Phase.night) {
            return "You can only use this ability at night."
        }
        if (id === player1Id) {
            return "You cannot protect yourself."
        }

        function removePreviousProtection() {
            if (lastProtected) {
                const protects = gameState.events?.[gameState.phaseCount].protects?.[lastProtected] || []
                for (let i = 0; i < protects.length; i++) {
                    if (protects[i].from === id) {
                        protects.splice(i, 1)
                        i--
                    }
                }
            }
        }

        removePreviousProtection();
        if (!gameState.players[id].status) {
            gameState.players[id].status = {}
        }
        gameState.players[id].status!.lastProtected = player1Id
        if (!gameState.events) {
            gameState.events = {}
        }
        if (!gameState.events[gameState.phaseCount].protects) {
            gameState.events[gameState.phaseCount].protects = {}
        }
        if (!gameState.events[gameState.phaseCount].protects![player1Id]) {
            gameState.events[gameState.phaseCount].protects![player1Id] = []
        }
        gameState.events[gameState.phaseCount].protects![player1Id].push({
            from: id,
            type: ProtectType.medic,
            against: allAttackTypes
        })
        return `You are protecting ${player1.name} tonight.`
        // cannot protect yourself + lore
        // can only protect at night + lore
        // check status if currently is protecting someone
        // change protection
        // add protection to event
        // return string
    }
}
export default medic
