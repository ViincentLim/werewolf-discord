export enum RoleName {
    medic = "medic",
    seer = "seer",
    villager = "villager",
    werewolf = "werewolf",
    serial_killer = "serial killer",
    clown = "clown",
    gunner = "gunner",
}

export const RoleDescription: {[key: string]: string;} = {
    [RoleName.medic]: "Every night, you can /protect a player. When the player is attacked that night, they do not die. You win with the villager team.",
    [RoleName.seer]: "Every night, you can /check if a player is good, evil or unknown. You win with the villager team.",
    [RoleName.werewolf]: "Once you become werewolf, you are invited to a werewolf channel. Every night, you can discuss with other werewolves and vote who to kill. You win with the werewolf team.",
}

export const roleTypeToRoles: {[index: string]:RoleName[]} = {
    protectiveVillagers: [RoleName.medic],
    infoVillagers: [RoleName.seer],
    otherVillagers: [RoleName.villager],
    killingVillagers: [RoleName.gunner],
    werewolves: [RoleName.werewolf],
    soloKillers: [RoleName.serial_killer],
    soloVoters: [RoleName.clown],
    // others: [RoleName.shapeshifter],
}

export const roleAssignmentList = [
    'infoVillagers',//1
    'werewolves',//2
    'protectiveVillagers',//3
    'otherVillagers',//4
    'otherVillagers',//5
    'werewolves',//6
    'soloVoters',
    'infoVillagers',
    'killingVillagers',
    'werewolves',
    'soloKillers',
    'protectiveVillagers',
    'soloVoters',
    'werewolves',
    'otherVillagers',
    'killingVillagers',
]

export type Role = {
    playerId: string
    init: () => void
}
// export function getRole(role: RoleName) {
//     switch (role) {
//         case RoleName.seer:
//             return seer
//     }
// }