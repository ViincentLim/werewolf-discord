import {Command} from "../discord/command";
import {Interaction} from "../discord/interaction";
import {GameState} from "../game/game";
import {InteractionResponseFlags} from "discord-interactions";
import {getRole} from "../game/game_role";
import {startCommandId} from "../game/game_constants";

const RoleCommand: Command = {
    data: {
        name: 'role',
        description: 'Retrieve your role.',
    },
    async execute(interaction: Interaction, gameState: GameState) {
        if (!gameState.started) {
            return {
                content: `Game has not started. Please use </start:${startCommandId}> to start the game.`,
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
        const player = gameState.players[interaction.member?.user.id || ""]
        if (!player) {
            return {
                content: `You did not join the game.`,
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
        if (!player.role) {
            return {
                content: `You do not have a role.`,
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }

        const role = getRole(player.role);
        let content = `Your role is ${player.role}.\n\n${role.description}\n\nTeam: ${role.team}\n\n`;
        if (getRole(player.role).hasWwChannelAccess) {
            content += `Join the werewolves channel: https://discord.gg/${gameState.wwInvite}\n\n`
        }
        return {
            content: content,
            flags: InteractionResponseFlags.EPHEMERAL

        }
    }
}
export default RoleCommand