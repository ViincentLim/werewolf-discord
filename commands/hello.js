const {InteractionResponseType} = require("discord-interactions");

module.exports = {
    data: {
        name: 'hello',
        description: 'Say hello to bot.',
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