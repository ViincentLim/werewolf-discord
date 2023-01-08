import {Command} from "../types/command";

const {InteractionResponseType} = require("discord-interactions");

const HelloCommand: Command = {
    data: {
        name: 'hello',
        description: 'Say hello to bot.',
    },
    async execute(interaction, gameState) {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Hello!`,
            },
        }
    }
}

export default HelloCommand