import {Model, Optional} from "sequelize";

export interface VenueAttrs {
    id : number,
    name : string;
    capacity : number;
    address : string;
    contact : string;
}

export interface VenueCreationAttrs extends Optional<VenueAttrs, 'id'> {}

export class Location extends Model<VenueAttrs, VenueCreationAttrs> implements VenueAttrs {
    declare public id: number; // id места проведения
    declare public name: string; // название
    declare public capacity: number; // вместимость
    declare public address: string; // адресс
    declare public contact : string; // контакты
    declare public readonly createdAt: Date; // дата создания, при создании не указывать
    declare public readonly updatedAt: Date; // дата измненения, при создании не указывать
}