import {GameState, Phase, PhaseInfo, Player} from "./game";
import {createWerewolfChannel, deleteWerewolfChannel} from "./werewolf_channel";
import {getRole, defaultRoleAssignmentList, RoleName, roleTypeToRoles} from "./game_role";
import {Interaction} from "../discord/interaction";
import {beginNightPhase} from "./phases/night_phase";
import {calculateWinCondition} from "./win_condition";
import {SendMessage} from "../discord/discord_message";


function assignRoles(players: {[key: string]: Player;}, roleAssignmentList: (string|RoleName)[]) {
    const shuffledRoleList = roleAssignmentList.splice(0, Object.values(players).length).shuffle()
    for (const player of Object.values(players)) {
        const possibleRole = shuffledRoleList.pop();
        const roles = roleTypeToRoles[possibleRole || ""];
        player.role = roles ? roles.random() : (possibleRole as RoleName)
    }
}

function getGameStateMessage(gameState: GameState) {
    return `
    Players:
    ${Object.values(gameState.players).map(player => {
        let name = `${player.name}`;
        if (player.killed)
        {
            name = `~~${name}~~`
        }
        return `• ${name} ${player.revealed ? `(${player.role})` : ""}\n`
    })}
    
    What happened:
    ${gameState.logs[gameState.phaseCount].map(log => {
        return `• ${log}\n`
    })}
    
    ${gameState.ended && gameState.winner ? `Game ended, ${gameState.players[gameState.winner || ""]?.name || gameState.winner} won` : ""}
    `;
}

export function newPhase(phase: Phase): PhaseInfo {
    return [phase, Date.now()];
}

export async function onGameStarted(gameState: GameState, interaction: Interaction) {
    assignRoles(gameState.players, defaultRoleAssignmentList)
    gameState.werewolves = Object.entries(gameState.players)
        .filter(([playerId, player]) => {
            return player.role && getRole(player.role).hasWwChannelAccess
        }).map(([playerId, player]) => {
            return playerId
        })
    for (const [_, player] of Object.entries(gameState.players)) {
        getRole(player.role!).init(player)
    }
    gameState.started = true
    const promises: Promise<any>[] = []
    promises.push(createWerewolfChannel(interaction, gameState))
    promises.push(sendGameStateMessage(interaction.channel_id, gameState))
    beginNightPhase(gameState, interaction.channel_id)
    await Promise.all(promises)
}

export async function onGameEnded(gameState: GameState, channelId: string) {
    // TODO: send message on who won (maybe not because already doing that)
    // TODO: send message asking for donations or fiverr
    // remove role
    // remove guild member
    // delete channel
    await deleteWerewolfChannel(gameState)
}

async function sendGameStateMessage(channelId: string, gameState: GameState) {
    await SendMessage(channelId, {
        content: getGameStateMessage(gameState) // the message that is sent at the end of every phase
    })
}

export async function onPhaseEnded(gameState: GameState, channelId: string) {
    // check if game is over (anyone won or stop prematurely)
    const winner = calculateWinCondition(gameState);
    if (winner) {
        gameState.winner = winner
        gameState.ended = true
    }
    await sendGameStateMessage(channelId, gameState);
    if (gameState.ended) {
        await onGameEnded(gameState, channelId)
    }
}