export type PhaseEvents = {
    // attacks?: Attack[]
    attacks?: { [key: string]: Attack[] }
    protections?: { [key: string]: Protection[] }
    // onAttacked?: { [key: string]: OnInflicted }
    // onDead?: { [key: string]: OnInflicted }
    // onNights
}

export type Attack = {
    from: string,
    // to: string,
    type: AttackType, // an enum which has an order of attack level => eg ww attack then solo killers
    // type: AttackType
}

export type Protection = {
    from: string,
    // to: string,
    type: ProtectionType, // an enum which has an order of protection level => eg use medic's protection then witch's
    // type: AttackType
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
export type OnInflicted = {
    // victim: string
    // the player who added this onAttack
    player: string
    // playerRole: RoleName
    then: string// todo: use enums
    // type: AttackType
}