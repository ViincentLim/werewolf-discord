const {InteractionResponseType} = require("discord-interactions");

module.exports = {
    data: {
        name: 'hello',
        description: 'Say hello to bot.',
        type: 1,
    },
    async execute(interaction) {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Hello!`,
            },
        }
    }
}