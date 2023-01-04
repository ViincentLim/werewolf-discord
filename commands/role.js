const {InteractionResponseType} = require("discord-interactions");

module.exports = {
    data: {
        name: 'role',
        description: 'Retrieve your role.',
        type: 1,
    },
    async execute(interaction) {
        let gameStarted = true; // todo: for dev only
        if (!gameStarted) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Game has not started. Please use /start to start the game.`,
                    flags: 1 << 6
                },
            }
        }
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Your role is ${"seer"}`,
                flags: 1 << 6
            },
        }
    }
}