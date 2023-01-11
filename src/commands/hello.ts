import {Command} from "../discord/command";

const HelloCommand: Command = {
    data: {
        name: 'hello',
        description: 'Say hello to bot.',
    },
    async execute(interaction, gameState) {
        return {
            content: `Hello!`,
        }
    }
}

export default HelloCommand