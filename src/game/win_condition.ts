import {GameState} from "./game";
import {getRole, TeamName} from "./game_role";

export function calculateWinCondition(gameState: GameState): TeamName|string|undefined {
    const alivePlayers = Object.entries(gameState.players).filter(([playerId, player]) => !player.killed);
    const aliveWolves = alivePlayers.filter(([playerId, player]) => player.role && getRole(player.role).team === TeamName.werewolf)
    // const aliveVillagers = alivePlayers.filter(([playerId, player]) => player.role && getRole(player.role).team === TeamName.villager)
    // filter not killed player, if werewolves == 0, villagers win
    if (aliveWolves.length === 0) {
        return TeamName.villager
    }
    // filter not killed player, if werewolves >= half of players left, ww win
    // todo: what if only clowns and ww left
    if (aliveWolves.length >= alivePlayers.length/2) {
        return TeamName.werewolf
    }
    // filter not killed player, if solo only one left, solo win
    // todo

    return undefined
}