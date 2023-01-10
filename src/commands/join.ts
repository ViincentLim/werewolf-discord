import {DiscordUser} from "../discord/interaction";
import {Player} from "../game/game";
import {Command} from "../discord/command";
import {InteractionResponseType} from "discord-interactions";

export function createPlayerFromUser(user: DiscordUser) : Player {
    return {
        name: `${user.username}#${user.discriminator}`,
        // role: undefined,
        // killed: undefined,
        // revealed: undefined,
        // status: {},
    }
}

const JoinCommand: Command = {
    data: {
        name: 'join',
        description: 'Join the new game.',
    },
    async execute(interaction, gameState) {
        const user = interaction.member!.user;
        const player = createPlayerFromUser(user);
        gameState.players[user.id] = player
        // todo edit original newGame message to add this player in??
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `${player.name} just joined the game!`,
            },
        }
    }
}

export default JoinCommand