import {Role, TeamName} from "../game/game_role";

export const villager: Role = {
    init(): void {},
    // playerId: "",
    name: "villager",
    description: "You have no abilities. You win with the villager team.",
    hasWwChannelAccess: false,
    team: TeamName.villager
}