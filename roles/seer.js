const {Message_Flags} = require("../enums");
module.exports = {
    check: (players, gameState) => {
        const player = players[0]
        //todo: if seer has checked, return error

        //todo: if player.alive
        //todo: player.onCheck()
        //todo: seer has checked = true
        return {
            content: `${playerName} is good 👍, bad 👎, unknown ❓`,
            flags: Message_Flags.EPHEMERAL,
        }
    }
}