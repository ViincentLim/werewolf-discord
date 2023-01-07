const {InteractionResponseType} = require("discord-interactions");
const {Application_Command_Option_Type} = require("../enums");

module.exports = {
    data: {
        name: 'check',
        description: 'Checks a player or more, depending on your role. Eg. /check @user1 @user2 to check both players.',
        options: [
            {
                name: "player1",
                description: "First player to check (for seers)",
                type: Application_Command_Option_Type.USER,
            },
            {
                name: "player2",
                description: "Second player to check (for detectives)",
                type: Application_Command_Option_Type.USER,
            },
        ]
    },
    async execute(interaction, gameState) {
        console.log(interaction.data.options)
        const playerIDs = interaction.data.options.map(option => Number(option.value))
        const uid = Number(interaction.member.user.id)
        // todo create you from uid
        // todo retrieve players from uid
        // todo retrieve gameState from db

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Checked!`,
            }
        }
        // return {
        //     type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        //     data: you.check(players, gameState)
        // }
    }
}