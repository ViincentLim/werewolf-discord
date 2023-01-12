import {GameState} from "./game";
import {getRole, TeamName} from "./game_role";

export function calculateWinCondition(gameState: GameState): TeamName|string|undefined {
    const alivePlayers = Object.entries(gameState.players).filter(([playerId, player]) => !player.killed);
    const aliveWolves = alivePlayers.filter(([playerId, player]) => player.role && getRole(player.role).team === TeamName.werewolf)
    // const aliveVillagers = alivePlayers.filter(([playerId, player]) => player.role && getRole(player.role).team === TeamName.villager)
    const aliveSoloKillers = alivePlayers.filter(([playerId, player]) => player.role && getRole(player.role).team === TeamName.soloKiller)
    // filter clown/solo voting win

    // filter not killed player, if werewolves >= half of players left, ww win
    // todo: what if only clowns and ww left
    if (aliveWolves.length >= alivePlayers.length/2) {
        return TeamName.werewolf
    }
    // filter not killed player, if solo only one left, solo win
    if (aliveSoloKillers.length === alivePlayers.length) {
        const playerId = alivePlayers[0][0];
        return playerId
    }
    // filter not killed player, if werewolves == 0, soloKillers == 0, villagers win
    // if (aliveVillagers.length === alivePlayers.length) {
    if (aliveWolves.length === 0 && aliveSoloKillers.length === 0) {
        return TeamName.villager
    }

    return undefined
}