import {Model, Optional} from "sequelize";
import {User} from "./user";

export interface TeamAttrs {
    id : number,
    name : string;
    address : string;
    participants ?: User[];
}

export interface TeamCreationAttrs extends Optional<TeamAttrs, 'id'> {}

export class Team extends Model<TeamAttrs, TeamCreationAttrs> implements TeamAttrs {
    declare  id : number; // id
    declare public name : string; // название команды
    declare public address : string; // адресс команды
    declare public readonly createdAt : Date; // дата создания, при создании не указывать
    declare public readonly updatedAt : Date; // дата измненения, при создании не указывать
}