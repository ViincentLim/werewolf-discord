import {GameState, ReasonOfDeath} from "../game";
import {sleepTill} from "../../utility/promises";
import {addLog, onPhaseEnd, onPhaseStart} from "../game_manager";
import {beginNightPhase} from "./night_phase";
import {SendMessage} from "../../discord/discord_message";

const votingLengthSeconds = 30;

export async function beginVotingPhase(gameState: GameState, channelId: string) {
    onPhaseStart(gameState, votingLengthSeconds)
    const phaseEndTimestamp = gameState.phase![1];
    SendMessage(channelId, {
        content: `Voting phase ends <t:${Math.round(phaseEndTimestamp / 1000 + votingLengthSeconds)}:R>`
    });
    gameState.votesCount = {}
    gameState.votersChoice = {}
    const alivePlayers = Object.entries(gameState.players).filter(([id, player]) => !player.killed);
    for (const [id] of alivePlayers) {
        gameState.votesCount[id] = 0
    }
    const playersInfoString = alivePlayers.map(([id, player]) => {
        return `${player.name}${player.revealed ? ` (${player.role})` : ""} ---**${gameState.votesCount![id] || "0"}**`
    }).join('\n');
    gameState.votingMessage = (await (await SendMessage(channelId, {
        content: `Send "/vote @playerId" to vote.\n**Players:**\n\n`+ playersInfoString
    })).json()).id
    // TODO actions like gunner shoot?
    await sleepTill(phaseEndTimestamp)
    let maxVotes = 0
    let votedPlayers: string[] = []
    for (const [id, votes] of Object.entries(gameState.votesCount)) {
        if (votes > maxVotes) {
            votedPlayers = []
            maxVotes = votes
        } else if (votes === maxVotes) {
            votedPlayers.push(id)
        }
    }
    let message: string;
    if (votedPlayers.length === 1) {
        let victim = gameState.players[votedPlayers[0]]
        victim.killed = ReasonOfDeath.voted
        // TODO: check if player should be revealed, check if game settings allow reveal
        victim.revealed = true
        // log
        message = `${victim.name} (${victim.revealed ? victim.role : "unknown role"}) was lynched`;
        addLog(gameState, message)
    } else {
        message = `no one was lynched`;
        addLog(gameState, message)
    }
    await SendMessage(channelId, {content: message})

    await onPhaseEnd(gameState, channelId);
    if (!gameState.ended) {
        beginNightPhase(gameState, channelId)
    }
}