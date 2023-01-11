import {Interaction} from "../discord/interaction";
import {
    GameState,
    maxPlayers,
    minPlayers,
} from "../game/game";
import {Command} from "../discord/command";
import {roleCommandId} from "../game/game_constants";
import {onGameStarted} from "../game/game_manager";

const StartCommand: Command = {
    data: {
        name: 'start',
        description: 'Starts the game. Requires 6-20 players.',
    },
    async execute(interaction: Interaction, gameState: GameState) {
        const playerCount = Object.keys(gameState.players).length;
        if (playerCount < minPlayers) {
            return {
                content: `You need at least ${minPlayers} players to start.`,
            }
        }
        if (playerCount > maxPlayers) {
            return {
                // ask players to /leave or /new
                content: `You can only have at most ${maxPlayers} players.`,
            }
        }
        if (gameState.started) {
            return {
                content: 'Game has already started.'
            }
        }
        await onGameStarted(gameState, interaction);
        return {
            content: `Game started. Send </role:${roleCommandId}> to get your role`,
        }
    }
};
export default StartCommand;