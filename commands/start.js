const {InteractionResponseType} = require("discord-interactions");
const {Application_Command_Option_Type} = require("../enums");

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
    async execute(interaction) {
        let players = 5; // todo: for development purpose only, check database on who joined in production
        if (players < 5) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `You need at least 5 players to start.`,
                },
            }
        }
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Game started. Send </role:1059832746698092694> to get your role`,
            },
        }
    }
}