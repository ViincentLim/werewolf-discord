import {ApplicationCommandOptionType} from "../enums"
import {Command} from "../discord/command";
import {Interaction} from "../discord/interaction";
import {GameState} from "../game/game";

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
    async execute(interaction: Interaction, gameState: GameState) {
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
        // // todo retrieve players from uid
        // // todo retrieve gameState from db

        return {
            content: `Checked!`,
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