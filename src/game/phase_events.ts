import {RoleName} from "./game_role";

export type PhaseEvents = {
    // attacks?: Attack[]
    attacks?: { [key: string]: Attack[] }
    protects?: { [key: string]: Protect[] }
    appears?: { [key: string]: Appear[] }
    // onAttacked?: { [key: string]: OnInflicted }
    // onDead?: { [key: string]: OnInflicted }
    // onNights
}

// ascending
export function actionComparatorLess(a: Action, b: Action) {
    return a.type - b.type
}
// // descending
// export function actionComparatorGreater(a: Action, b: Action) {
//     return b.type - a.type
// }

export interface Action {
    from: string,
    type: number,

}

export interface Attack extends Action {
    // from: string,
    // to: string,
    type: AttackType, // an enum which has an order of attack level => eg ww attack then solo killers
    // type: AttackType
}

export interface Protect extends Action {
    // from: string,
    against: AttackType[],
    // to: string,
    type: ProtectType, // an enum which has an order of protection level => eg use medic's protection then witch's
    // type: AttackType
}
// in ascending order, the order of what happens first (0= most priority)
export interface Appear extends Action {
    // from: string,
    // type: AppearType,
    as: RoleName
}
// todo, check if export const enum or export enum better
export enum AttackType {
    werewolf,
    solo,
}
export const allAttackTypes = [AttackType.werewolf, AttackType.solo]

export enum ProtectType {
    medic,
    witch,
}

/*
eg. medic's protect player.onAttack:
{
    player: medicId,
    then: 'protect'
    thenOption: null
}
eg. witch's protect player.onAttack:
{
    player: witchId,
    then: 'protect'
    thenOption: null
}
eg. cursed.onDead // OR MAYBE add these to methods in cursed.ts
{
    player: cursedId,
    then: 'turnIntoW'
    thenOption: null
}
eg. baby ww.onDead
{
    player: jwwId,
    then: 'kill'
    thenOption: playerId
}
 */