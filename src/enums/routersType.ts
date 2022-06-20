import {LocationRouter} from "../routes/LocationRouter";
import {TeamInTournamentRouter} from "../routes/TeamInTournamentRouter";

export enum AuthRoute {
    login = "/login",
    signup = "/signup",
    logout = "/logout",
    refresh = "/refresh"
}
export enum UserRoute {
    getAll = "/user",
    getById = "/user/:id",
    update = "/user",
    remove = "/user"
}
export enum TeamRoute {
    getAll = "/team",
    getById = "/team/:id",
    create = "/team",
    addToTournament = "/team/add2tournament",
    update = "/team",
    remove = "/team"
}

export enum TournamentRoute {
    getAll = "/tournament",
    getById = "/tournament/:id",
    create = "/tournament",
    update = "/tournament",
    remove = "/tournament"
}
export enum LocationRoute {
    getAll = "/location",
    getById = "/location/:id",
    create = "/location",
    update = "/location",
    remove = "/location"
}
export enum GameRoute {
    getAll = "/game",
    getById = "/game/:id",
    create = "/game",
    update = "/game",
    remove = "/game"
}

export enum TeamInTournamentRoute {
    getAll = "/teamInTournament"
}