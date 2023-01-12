import {Role, RoleName, TeamName} from "../game/game_role";

const werewolf: Role = {
    init(): void {},
    // playerId: "",
    name: RoleName.werewolf,
    description: "Every night, you can discuss on the werewolf channel and vote a player to kill. You win with the werewolf team.",
    hasWwChannelAccess: true,
    team: TeamName.werewolf
}
export default werewolf
