import {ApplicationCommandOptionType} from "../enums"
import {Command} from "../discord/command";
import {ApplicationCommandInteraction} from "../discord/interaction";
import {GameState} from "../game/game";
import {getRole, RoleName} from "../game/game_role";
import {InteractionResponseFlags} from "discord-interactions";

const CheckCommand: Command = {
    data: {
        name: 'check',
        description: 'Checks a player or more, depending on your role. Eg. /check @user1 @user2 to check both players.',
        options: [
            {
                name: "player1",
                description: "First player to check",
                type: ApplicationCommandOptionType.USER,
                required: true
            },
            {
                name: "player2",
                description: "Second player to check (for detectives)",
                type: ApplicationCommandOptionType.USER,
            },
        ]
    },
    async execute(interaction: ApplicationCommandInteraction, gameState: GameState) {
        // console.log(interaction.data.options)
        // const playerIDs = interaction.data.options?.map(option => Number(option.value)) || []
        // const uid = Number(interaction.member?.user.id)
        // // todo get your role from uid
        // /*
        // get your role from uid
        // get player(s)' role from pid
        // from phaseEvents, call onChecks
        // if no onChecks, reply getAura(role)
        //  */
        const userId = interaction.member?.user.id;
        if (!userId || !gameState.players[userId]) {
            return {
                content: `You did not join the game.`,
                flags: InteractionResponseFlags.EPHEMERAL,
            }
        }
        const roleName: RoleName|undefined = gameState.players[userId || ""].role
        if (!roleName) {
            return {
                content: `You do not have a role yet.`,
                flags: InteractionResponseFlags.EPHEMERAL,
            }
        }

        // // todo retrieve players from uid
        // // todo retrieve gameState from db
        let params: {[key: string]: any} = {}
        for (const option of interaction.data.options?.values() || []) {
            params[option.name] = option.value
        }

        return {
            content: getRole(roleName).check?.(gameState, userId, params) || "You cannot use this command.",
            flags: InteractionResponseFlags.EPHEMERAL
        }
        // return {
        //     type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        //     data: you.check(players, gameState)
        // }
    }
};
export default CheckCommand;

/**
 * TS2322: Type '(interaction: Interaction, gameState: GameState) => Promise<{ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE; data: { content: string; }; }>' is not assignable to
 * type '(interaction: Interaction, gameState: GameState) => Promise<InteractionResponse>'.
 * Type 'Promise<{ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE; data: { content: string; }; }>' is not assignable to type 'Promise<InteractionResponse>'.     Type '{ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE; data: { content: string; }; }' is not assignable to type 'InteractionResponse'.       Types of property 'type' are incompatible.         Type 'InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE' is not assignable to type 'InteractionCallbackType'.
 */