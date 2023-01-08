import {PhaseEvents} from "./phase_events";

export const minPlayers = 6;
export const maxPlayers = 20;

export type GameState = {
    started: boolean
    phaseCount: number // -1 when not started
    players: {[key: string]: Player;}//Map<string, Player> //player => roles
    // roles: Map<string, string|undefined>//player => roles
    phase?: [Phase, number],
    // events: { [key: string]: PhaseEvents;  everyNight: PhaseEvents, everyDiscussion: PhaseEvents, everyVoting: PhaseEvents}
    events: PhaseEvents[] // [night1, discuss1, vote1, night2, discuss2...]
    everyEvents: { night: PhaseEvents, discussion: PhaseEvents, voting: PhaseEvents }
    // phases: {everyNight: {}, everyDiscussion: {}, everyVoting: {}}
}

export type Player = {
    name: string
    role?: string
    killed?: string
    revealed?: boolean
    status?: {[key: string]: any} // to track e.g. how many potions witch has left, how many lives bg has left
}

export const enum Phase {
    night = 'night',
    discussion = 'discuss',
    voting = 'vote',
}

// phase name, time
export type PhaseInfo = [Phase, number]