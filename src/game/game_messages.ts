import {GameState, Player} from "./game";
import {voteCommandId} from "./game_constants";
import {StringSelectOption} from "discord-interactions";
import WerewolfVote from "../message_component/werewolf_vote";

export function getVotingMessage(gameState: GameState, alivePlayers: [string, Player][]) {
    const playersInfoString = alivePlayers.map(([id, player]) => {
        return `${player.name}${player.revealed ? ` (${player.role})` : ""} ---**${gameState.votesCount![id] || "0"}**`
    }).join('\n');
    const votingMessage = {
        content: `Send "</vote:${voteCommandId}> @playerId" to vote.\n**Votes:**\n\n${playersInfoString}`
    };
    return votingMessage;
}

export function getWerewolfVotingMessage(gameState: GameState) {
    const werewolfVoteOptions: StringSelectOption[] = []
    for (const [aliveNonWerewolfId, aliveNonWerewolfPlayer] of Object.entries(gameState.players).filter(([id, player]) => !player.killed && !(gameState.werewolves || []).includes(id))) {
        werewolfVoteOptions.push({
            label: aliveNonWerewolfPlayer.name,
            value: aliveNonWerewolfId
        })
    }

    const message = {
        content: "Vote for a player to kill tonight." + "\nVotes:\n\n" + werewolfVoteOptions.map(option => `${option.label} ---**${gameState.wwVotesCount![option.value]}**`).join("\n"),
        components: [
            {
                components: [
                    {
                        custom_id: WerewolfVote.data.name,
                        max_values: 1,
                        min_values: 1,
                        options: [
                            werewolfVoteOptions
                        ],
                        placeholder: "Choose a player to kill.",
                        type: 3
                    }
                ],
                type: 1
            }
        ]
    };
    return message;
}