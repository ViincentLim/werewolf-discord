import {PhaseEvents} from "./phase_events";
import {RoleName, TeamName} from "./game_role";

export const minPlayers = 6;
export const maxPlayers = 20;

export type GameState = {
    votesCount?: {[key: string]: number}
    votersChoice?: {[key: string]: string}
    votingMessage?: string
    started: boolean
    ended: boolean
    logs?: {[key: number]: string[]}
    winner?: TeamName|string
    phaseCount: number // -1 when not started
    players: {[key: string]: Player;}//Map<string, Player> //player => roles
    // werewolves: string[] -> need a way to find weakest ww, used for werewolves channel as well
    // villagers: string[]
    // roles: Map<string, string|undefined>//player => roles
    phase?: [Phase, number],
    // events: { [key: string]: PhaseEvents;  everyNight: PhaseEvents, everyDiscussion: PhaseEvents, everyVoting: PhaseEvents}
    events?: {[key: number]: PhaseEvents} // [night1, discuss1, vote1, night2, discuss2...]
    everyEvents?: { night: PhaseEvents, discussion: PhaseEvents, voting: PhaseEvents }
    wwChannel?: string
    wwInvite?: string
    wwGuildRole?: string
    werewolves?: string[]
    // phases: {everyNight: {}, everyDiscussion: {}, everyVoting: {}}
}

export type Player = {
    name: string
    role?: RoleName
    fakeRole?: RoleName // eg. "seer" for fool seer, maybe amnesiac?
    killed?: string|ReasonOfDeath
    revealed?: boolean
    status?: {[key: string]: any} // to track e.g. how many potions witch has left, how many lives bg has left
}

export const enum ReasonOfDeath {
    voted = "voted"
}

export const enum Phase {
    night = 'night',
    discussion = 'discuss',
    voting = 'vote',
}

// phase name, time
export type PhaseInfo = [Phase, number]