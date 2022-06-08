import {Model, Optional} from "sequelize";
import {Game} from "./game";

export interface LocationAttrs {
    id : number,
    name : string;
    games?: Game[]
    capacity : number;
    address : string;
    contact : string;
}

export interface LocationCreationAttrs extends Optional<LocationAttrs, 'id'> {}

export class Location extends Model<LocationAttrs, LocationCreationAttrs> implements LocationAttrs {
    declare public id: number; // id места проведения
    declare public name: string; // название
    declare public capacity: number; // вместимость
    declare public address: string; // адресс
    declare public contact : string; // контакты
    declare public readonly createdAt: Date; // дата создания, при создании не указывать
    declare public readonly updatedAt: Date; // дата измненения, при создании не указывать
}