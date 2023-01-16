import {GameState} from "./game";

export function getAlivePlayers(gameState: GameState) {
    return Object.entries(gameState.players).filter(([id, player]) => !player.killed);
}