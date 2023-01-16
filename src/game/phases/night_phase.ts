import {GameState} from "../game";
import {mergeObjectsWithArrayAsValue} from "../../utility/helper_functions";
import {actionComparatorLess, Attack, AttackType, PhaseEvents, Protect} from "../phase_events";
import {sleepTill} from "../../utility/promises";
import {SendMessage} from "../../discord/discord_message";
import {EditPermission} from "../../discord/manage_permission";
import {PermissionFlags} from "../../enums";
import {wwGuildId} from "../game_constants";
import {addLog, onPhaseEnd, onPhaseStart} from "../game_manager";
import {beginDiscussionPhase} from "./discussion_phase";
import {SelectOption} from "../../discord/interaction";
import {RoleName} from "../game_role";

const nightLengthSeconds = 30;

function attackWerewolfVictim(gameState: GameState) {
    let maxVotes = 0
    let votedPlayers: string[] = []
    for (const [id, votes] of Object.entries(gameState.wwVotesCount!)) {
        if (votes > maxVotes) {
            votedPlayers = []
            maxVotes = votes
        } else if (votes === maxVotes) {
            votedPlayers.push(id)
        }
    }
    if (votedPlayers.length !== 1) {
        return
    }
    const werewolfVictim = votedPlayers[0]
    if (!gameState.events) {
        gameState.events = {}
    }
    if (!gameState.events[gameState.phaseCount]) {
        gameState.events[gameState.phaseCount] = {}
    }
    if (!gameState.events[gameState.phaseCount].attacks) {
        gameState.events[gameState.phaseCount].attacks = {}
    }
    if (!gameState.events[gameState.phaseCount].attacks![werewolfVictim]) {
        gameState.events[gameState.phaseCount].attacks![werewolfVictim] = []
    }
    gameState.events[gameState.phaseCount].attacks![werewolfVictim].push({
        type: AttackType.werewolf,
        from: RoleName.werewolf
    })
}

export async function beginNightPhase(gameState: GameState, channelId: string) {
    onPhaseStart(gameState, nightLengthSeconds);
    const phaseEndTimestamp = gameState.phase![1];
    SendMessage(channelId, {
        content: `Night phase ends <t:${Math.round(phaseEndTimestamp / 1000 + nightLengthSeconds)}:R>`
    })
    // allow permission for ww to send msg on wwChannel
    await EditPermission({
        allow: PermissionFlags.VIEW_CHANNEL | PermissionFlags.SEND_MESSAGES,
        roleId: gameState.wwGuildRole,
        guildId: wwGuildId,
        channelId: gameState.wwChannel!,
    })
    const werewolfVoteOptions: SelectOption[] = []
    for (const [aliveNonWerewolfId, aliveNonWerewolfPlayer] of Object.entries(gameState.players).filter(([id, player]) => !player.killed && !(gameState.werewolves || []).includes(id))) {
        werewolfVoteOptions.push({
            label: aliveNonWerewolfPlayer.name,
            value: aliveNonWerewolfId
        })
    }

    gameState.wwVotesCount = {}
    gameState.wwVotersChoice = {}
    SendMessage(gameState.wwChannel || "", {
        content: "Vote for a player to kill tonight."+"\nVotes:\n\n"+werewolfVoteOptions.map(option => `${option.label} ---**${gameState.wwVotesCount![option.value]}**`).join("\n"),
        components: [
            {
                components: [
                    {
                        custom_id: `werewolf_vote_${gameState.wwChannel}`,
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
    }).then(async r => {
        gameState.wwVotingMessage = (await r.json()).id;
    })
    // timer
    await sleepTill(phaseEndTimestamp)
    // deny permission for ww to send msg on wwChannel
    await EditPermission({
        allow: PermissionFlags.VIEW_CHANNEL,
        deny: PermissionFlags.SEND_MESSAGES,
        roleId: gameState.wwGuildRole,
        guildId: wwGuildId,
        channelId: gameState.wwChannel!,
    })
    // attack werewolf vote
    attackWerewolfVictim(gameState);


    // when timer over, check actions
    // gameState.attacks = []
    const everyNightEvents: PhaseEvents = gameState.everyEvents?.night || {}
    const thisNightEvents: PhaseEvents = gameState.events?.[gameState.phaseCount] || {}
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

    await onPhaseEnd(gameState, channelId);
    if (!gameState.ended) {
        beginDiscussionPhase(gameState, channelId)
    }
}