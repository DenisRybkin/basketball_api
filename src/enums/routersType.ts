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
    update = "/team",
    remove = "/team"
}