import {GameState} from "../game";
import {sleepTill} from "../../utility/promises";
import {onPhaseEnd, onPhaseStart} from "../game_manager";
import {SendMessage} from "../../discord/discord_message";
import {beginVotingPhase} from "./voting_phase";

const discussionLengthSeconds = 60;

export async function beginDiscussionPhase(gameState: GameState, channelId: string) {
    onPhaseStart(gameState, discussionLengthSeconds)
    const phaseEndTimestamp = gameState.phase![1];
    SendMessage(channelId, {
        content: `Discussion phase ends <t:${Math.round(phaseEndTimestamp / 1000 + discussionLengthSeconds)}:R>`
    })
    await sleepTill(phaseEndTimestamp)

    // TODO actions like gunner shoot?

    await onPhaseEnd(gameState, channelId);
    if (!gameState.ended) {
        beginVotingPhase(gameState, channelId)
    }
}