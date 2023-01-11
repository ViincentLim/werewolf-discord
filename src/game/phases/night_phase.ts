import {GameState, Phase} from "../game";
import {mergeObjectsWithArrayAsValue} from "../../utility/helper_functions";
import {actionComparatorLess, Attack, Protect} from "../phase_events";
import {sleep} from "../../utility/promises";
import {SendMessage} from "../../discord/discord_message";
import {EditPermission} from "../../discord/manage_permission";
import {PermissionFlags} from "../../enums";
import {wwGuildId} from "../game_constants";
import {newPhase, onPhaseEnded} from "../game_manager";

const nightLengthSeconds = 30;

function addLog(gameState: GameState, log: string) {
    if (!gameState.logs[gameState.phaseCount]) {
        gameState.logs[gameState.phaseCount] = []
    }
    gameState.logs[gameState.phaseCount].push(log)
}

export async function beginNightPhase(gameState: GameState, channelId: string) {
    gameState.phase = newPhase(Phase.night);
    SendMessage(channelId, {
        content: `Night phase ends ${Math.round(gameState.phase[1] / 1000 + nightLengthSeconds)}`
    })
    // allow permission for ww to send msg on wwChannel
    await EditPermission({
        allow: PermissionFlags.VIEW_CHANNEL | PermissionFlags.SEND_MESSAGES,
        roleId: gameState.wwGuildRole,
        guildId: wwGuildId,
        channelId: gameState.wwChannel!,
    })
    // timer
    await sleep(nightLengthSeconds*1000)
    // deny permission for ww to send msg on wwChannel
    await EditPermission({
        allow: PermissionFlags.VIEW_CHANNEL,
        deny: PermissionFlags.SEND_MESSAGES,
        roleId: gameState.wwGuildRole,
        guildId: wwGuildId,
        channelId: gameState.wwChannel!,
    })
    // when timer over, check actions
    // gameState.attacks = []
    const everyNightEvents = gameState.everyEvents.night
    const thisNightEvents = gameState.events[gameState.phaseCount/3]
    const allAttacks = (mergeObjectsWithArrayAsValue(everyNightEvents.attacks || {}, thisNightEvents.attacks || {}) as { [key: string]: Attack[] });
    const allProtects = (mergeObjectsWithArrayAsValue(everyNightEvents.protects || {}, thisNightEvents.protects || {}) as { [key: string]: Protect[] });
    for (const [to, attacks] of Object.entries(allAttacks)) {
        // todo role.onAttack()
        // todo: check onAttacks
        /*
        for each attack, check if there is protection
        else kill
         */
        const protects = allProtects[to].sort(actionComparatorLess);
        for (const attack of attacks.sort(actionComparatorLess)) { // ascending
            let isProtected = false
            for (const protect of protects) {
                if (protect.against.includes(attack.type)) {
                    // Protect successful
                    switch (protect.type) {
                        // TODO: witch, deduct potion or sth... etc
                    }
                    isProtected = true
                }
            }
            if (!isProtected) {
                // KILL
                // killed by who on gameState.players.player
                const victim = gameState.players[to];
                victim.killed = attack.from
                // trigger onDead, onAttackSuccess
                // add log to gameState to inform players??

                // TODO: check if player should be revealed, check if game settings allow reveal
                victim.revealed = true
                addLog(gameState, `${victim.name} (${victim.revealed ? victim.role : "unknown role"}) was killed by ${gameState.players[attack.from].role}`)
                break;// todo: see if there're any cases where i should not exit loop, IF THERE ARE, use player.killed to prevent player from being killed again
            }
        }
    }

    await onPhaseEnded(gameState, channelId);
    if (!gameState.ended) {
        // TODO beginDiscussion()
    }
}