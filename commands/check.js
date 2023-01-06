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
    async execute(interaction) {
        console.log(interaction.options)
        // todo create you from uid
        // todo retrieve players from uid
        return {
            content: `Checked!`,
        }
        // return you.check(players, gameState)
    }
}