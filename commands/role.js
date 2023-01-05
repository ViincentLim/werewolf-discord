const {InteractionResponseType} = require("discord-interactions");

module.exports = {
    data: {
        name: 'role',
        description: 'Retrieve your role.',
    },
    async execute(interaction) {
        /*
        * todo
        * db
        * check game started with channel id
        * check user's role with user id
        * */
        const userId = interaction.member?.user?.id
        const channelId = interaction.channel_id
        if (!userId || !channelId) {
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Error`,
                    flags: 1 << 6
                },
            }
        }

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