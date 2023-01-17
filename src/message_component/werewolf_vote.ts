import {Message, MessageComponentInteraction} from "../discord/interaction";
import {GameState, Phase} from "../game/game";
import {InteractionResponseFlags} from "discord-interactions";
import {getWerewolfVotingMessage} from "../game/game_messages";

type MessageComponentHandler = {
    data: {
        name: string
    }
    execute: (interaction: MessageComponentInteraction, gameState: GameState) => Promise<Message>
}

const WerewolfVote: MessageComponentHandler = {
    data: {
        name: "werewolf_vote",
    },
    async execute(interaction, gameState) {
        const votedId: string = String(interaction.data.values?.[0].value || "");
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

        // if game phase is not night phase
        if (gameState.phase?.[0] !== Phase.night || !gameState.wwVotersChoice || !gameState.wwVotesCount) {
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

        function getPlayer(id: string) {
            return gameState.players[id];
        }

        const prevVote = gameState.wwVotersChoice[voterId];
        if (prevVote) {
            gameState.wwVotesCount[prevVote]--
        }
        gameState.wwVotersChoice[voterId] = votedId
        gameState.wwVotesCount[votedId]++

        return getWerewolfVotingMessage(gameState)
    }
}

export default WerewolfVote