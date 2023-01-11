import {ApplicationCommandOption, Interaction, Message} from "./interaction";
import {GameState} from "../game/game";

export type Command = {
    data: { name: string, description: string, options?: ApplicationCommandOption[] },
    execute: (interaction: Interaction, gameState: GameState) => Promise<Message>
}