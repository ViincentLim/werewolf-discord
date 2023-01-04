const {InteractionResponseType} = require("discord-interactions");

const admin = require("firebase-admin");

module.exports = {
    data: {
        name: 'new',
        description: 'Creates a new game.',
        type: 1,
    },
    async execute(interaction) {
        const db = admin.database()
        await db.ref('test').set(interaction.data)
        // todo: create game on db with channel id
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Game created. Send </join:1059832746698092694> to join.`,
            },
        }
    }
}