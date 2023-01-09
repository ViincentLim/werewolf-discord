import {InteractionResponseType} from "discord-interactions"
import {HtmlMethod} from "../enums"
import {DiscordRequest} from "../discord_request"
import {promisify} from 'util'
import {Interaction} from "../types/interaction";
import {
    GameState,
    maxPlayers,
    minPlayers,
    Phase, PhaseInfo,
    Player,
} from "../types/game/game";
import {Command} from "../types/command";
import {roleAssignmentList, roleTypeToRoles} from "../types/game/game_role";
import {actionComparatorLess, Attack, Protect} from "../types/game/phase_events";
import {mergeObjectsWithArrayAsValue} from "../extensions/helper_functions";

const sleep = promisify(setTimeout);

const nightLengthSeconds = 30;

async function beginNightPhase(gameState: GameState, channelId: string) {
    gameState.phase = newPhase(Phase.night);
    DiscordRequest({
        endpoint: `channels/${channelId}/messages`,
        method: HtmlMethod.POST,
        body: {
            content: `Night phase ends ${gameState.phase[1] / 1000 + nightLengthSeconds}`
        }
    })
    // timer
    await sleep(nightLengthSeconds*1000)
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
                gameState.players[to].killed = attack.from
                // trigger onDead, onAttackSuccess
                // add log to gameState to inform players??
            }
        }
    }
    // for (const attack of everyNightEvents.attacks || []) {
    //     console.log(attack) //TODO: attack protect logic
    // }
    // for (const attack of thisNightEvents.attacks || []) {
    //     console.log(attack) //TODO: attack protect logic
    // }
    // for each attack, check if protected or invulnerable
    // TODO check if game is over (anyone won or stop prematurely)
    // else beginDiscussion

}

function newPhase(phase: Phase): PhaseInfo {
    return [phase, Date.now()];
}

function assignRoles(players: {[key: string]: Player;}) {
    const shuffledRoleTypeList = roleAssignmentList.splice(0, Object.values(players).length).shuffle()
    for (const player of Object.values(players)) {
        player.role = roleTypeToRoles[shuffledRoleTypeList.pop() || ""].random()
    }
}

const StartCommand: Command = {
    data: {
        name: 'start',
        description: 'Starts the game. Requires 6-20 players.',
        // options: [
        //     {
        //         name: "mode",
        //         description: "Set the name for the game",
        //         type: ApplicationCommandOptionType.STRING,
        //         choices: [
        //             {
        //                 name: "Basic",
        //                 value: "basic"
        //             },
        //             {
        //                 name: "Regular",
        //                 value: "regular"
        //             }
        //         ]
        //     },
        // ]
    },
    async execute(interaction: Interaction, gameState: GameState) {
        const playerCount = Object.keys(gameState.players).length;
        if (playerCount < minPlayers) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `You need at least ${minPlayers} players to start.`,
                },
            }
        }
        if (playerCount > maxPlayers) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    // ask players to /leave or /new
                    content: `You can only have at most ${maxPlayers} players.`,
                },
            }
        }
        assignRoles(gameState.players)
        // send message to each role, OK maybe not, can just /role
        // TODO role.init() => set Player.status (eg how many potions, how many lives, hh target)
        gameState.started = true
        beginNightPhase(gameState, interaction.channel_id)
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Game started. Send </role:1059832746698092694> to get your role`,
            },
        }
    }
};
export default StartCommand;