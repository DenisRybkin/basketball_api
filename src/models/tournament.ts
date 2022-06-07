import {Model, Optional} from "sequelize";
import {Game} from "./game";

export interface TournamentAttrs {
    id : number,
    name : string;
    address : string;
    userId : number;
    games ?: Game[];
    // createdAt : Date;
    // updatedAt : Date;
}

export interface TournamentCreationAttrs extends Optional<TournamentAttrs, 'id'> {}

export class Tournament extends Model<TournamentAttrs, TournamentCreationAttrs> implements TournamentAttrs {
    declare public id : number; // id турнира, при создании не указывать
    declare public name : string;
    declare public address : string;
    declare public userId : number;
    declare public readonly createdAt : Date; // дата создания, при создании не указывать
    declare public readonly updatedAt : Date; // дата измненения, при создании не указывать
}