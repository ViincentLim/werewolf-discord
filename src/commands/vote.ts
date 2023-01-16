import {Command} from "../discord/command";
import {InteractionResponseFlags} from "discord-interactions";
import {Phase} from "../game/game";
import {EditMessage} from "../discord/discord_message";
import {getVotingMessage} from "../game/game_messages";
import {getAlivePlayers} from "../game/game_players";


const VoteCommand: Command = {
    data: {
        name: 'vote',
        description: 'Vote to lynch a player during voting phase. Your vote is not anonymous',
    },
    execute: async function (interaction, gameState) {
        const votedId: string = String(interaction.data.options?.[0].value || "");
        const voterId: string|undefined = interaction.member?.user.id;
        const votedPlayer = getPlayer(votedId);
        const voterPlayer = getPlayer(voterId||"");

        // if YOU are dead
        if (voterPlayer.killed) {
            return {
                content: "You cannot participate when you are dead.",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }

        // if game phase is not voting phase
        if (gameState.phase?.[0] !== Phase.voting || !gameState.votersChoice || !gameState.votesCount) {
            return {
                content: "You can only vote during voting phase.",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }

        //
        if (!votedId) {
            return {
                content: "Please enter a valid user.",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
        if (!voterId) {
            return {
                content: "You can only vote on the channel the game is played.",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
        // if player does not exist
        if (!votedPlayer) {
            return {
                content: "This player is not in the game.",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
        // if voted is dead
        if (votedPlayer.killed) {
            return {
                content: "You cannot vote a dead player.",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
        // if voted self
        if (voterId === votedId) {
            return {
                content: "You cannot vote yourself.",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }

        function getPlayer(id: string) {
            return gameState.players[id];
        }

        const prevVote = gameState.votersChoice[voterId];
        if (prevVote) {
            gameState.votesCount[prevVote]-- // todo change to -= role.getVote(id, gameState) so that: mayor, voteless character can be accounted
        }
        gameState.votersChoice[voterId] = votedId
        gameState.votesCount[votedId]++ // todo change to += role.getVote(id, gameState) so that: mayor, voteless character can be accounted

        EditMessage(interaction.channel_id, gameState.votingMessage || "", getVotingMessage(gameState, getAlivePlayers(gameState)))

        return {
            content: `${voterPlayer?.name} voted for ${votedPlayer.name}`,
        }
    }
}

export default VoteCommand