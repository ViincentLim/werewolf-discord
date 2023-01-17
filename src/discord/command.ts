import {ApplicationCommandInteraction, ApplicationCommandOption, Message} from "./interaction";
import {GameState} from "../game/game";

export type Command = {
    data: { name: string, description: string, options?: ApplicationCommandOption[] },
    execute: (interaction: ApplicationCommandInteraction, gameState: GameState) => Promise<Message>
}