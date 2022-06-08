import {UserRoleTypes} from "../models/types/userTypes";

export type UserRolesType = {
    role: UserRoleTypes,
    level: number
}

export const UserRoles: UserRolesType[] = [
    {
        role: UserRoleTypes.guest,
        level: 0
    },
    {
        role: UserRoleTypes.participant,
        level: 1
    },
    {
        role: UserRoleTypes.organizer,
        level: 2
    },
    {
        role: UserRoleTypes.admin,
        level: 3
    }
]