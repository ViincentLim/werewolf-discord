const {InteractionResponseType} = require("discord-interactions");
const {Application_Command_Option_Type, Html_Method} = require("../enums");
const {DiscordRequest} = require("../discord_request");

const PHASE = {
    night: 'night',
    discussion: 'discuss',
    voting: 'vote',
}
const sleep = require('util').promisify(setTimeout);

const nightLengthSeconds = 30;

async function beginNightPhase(gameState, channelId) {
    gameState.phase = newPhase(PHASE.night);
    DiscordRequest({
        endpoint: `channels/${channelId}/messages`,
        method: Html_Method.POST,
        body: {
            content: `Night phase ends ${gameState.phase.night / 1000 + nightLengthSeconds}`
        }
    })
    // timer
    await sleep(nightLengthSeconds*1000)
    // when timer over, check actions
    // gameState.attacks = []
    for (const attack of gameState.attacks) {

    }
    // for each attack, check if protected or invulnerable
    // TODO check if game is ended
    // else beginDiscussion

}

function newPhase(phase) {
    return {[phase]: Date.now()};
}

module.exports = {
    data: {
        name: 'start',
        description: 'Starts the game. Requires at least 5 players.',
        options: [
            {
                name: "mode",
                description: "Set the name for the game",
                type: Application_Command_Option_Type.STRING,
                choices: [
                    {
                        name: "Basic",
                        value: "basic"
                    },
                    {
                        name: "Regular",
                        value: "regular"
                    }
                ]
            },
        ]
    },
    async execute(interaction, gameState) {
        // let players = 5; // todo: for development purpose only, check database on who joined in production
        if (gameState.players?.length < 5) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `You need at least 5 players to start.`,
                },
            }
        }
        gameState.started = true
        beginNightPhase(gameState, interaction.channel_id)
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Game started. Send </role:1059832746698092694> to get your role`,
            },
        }
    }
}