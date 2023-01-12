import {Player} from "./game";
import * as path from "path";
import * as fs from "fs";
import villager from "../roles/villager";

export const enum RoleName {
    medic = "medic",
    seer = "seer",
    villager = "villager",
    werewolf = "werewolf",
    serial_killer = "serial killer",
    clown = "clown",
    gunner = "gunner",
}
export const enum TeamName {
    villager = "villager",
    werewolf = "werewolf",
    // solo = "solo",
    soloKiller = "soloKiller",
    soloVoter = "soloVoter",
}

// export const RoleDescription: {[key: string]: string;} = {
//     [RoleName.medic]: "Every night, you can /protect a player. When the player is attacked that night, they do not die. You win with the villager team.",
//     [RoleName.seer]: "Every night, you can /check if a player is good, evil or unknown. You win with the villager team.",
//     [RoleName.werewolf]: "Once you become werewolf, you are invited to a werewolf channel. Every night, you can discuss with other werewolves and vote who to kill. You win with the werewolf team.",
// }

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

export const defaultRoleAssignmentList = [
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

// TODO: change to OOP?
export interface Role {
    name: RoleName
    description: string
    team: TeamName
    // init: (playerId: string, gameState: GameState) => void
    // Set Player.status (eg how many potions, how many lives, hh target)
    init: (player: Player) => void
    hasWwChannelAccess: boolean
}


function getRoleObjects() {
    const roleObjects: Map<RoleName, Role> = new Map()
    const rolesPath = path.join(__dirname, './../roles')
    const roleFiles = fs.readdirSync(rolesPath).filter(file => file.endsWith('.js'));
    for (const file of roleFiles) {
        const filePath = path.join(rolesPath, file);
        const role: Role = require(filePath).default
        roleObjects.set(role.name, role)
    }
    return roleObjects;
}

const roleObjects = getRoleObjects();

export function getRole(roleName: RoleName): Role {
    return roleObjects.get(roleName) || villager
}