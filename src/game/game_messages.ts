import {GameState, Player} from "./game";
import {voteCommandId} from "./game_constants";

export function getVotingMessage(gameState: GameState, alivePlayers: [string, Player][]) {
    const playersInfoString = alivePlayers.map(([id, player]) => {
        return `${player.name}${player.revealed ? ` (${player.role})` : ""} ---**${gameState.votesCount![id] || "0"}**`
    }).join('\n');
    const votingMessage = {
        content: `Send "</vote:${voteCommandId}> @playerId" to vote.\n**Votes:**\n\n${playersInfoString}`
    };
    return votingMessage;
}