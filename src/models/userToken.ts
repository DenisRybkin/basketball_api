import {Model, Optional} from "sequelize";

export interface UserTokenAttrs {
    id : number,
    userId : number
    refreshToken : string;
    accessToken : string;
    isActivated : boolean;
    // activationLink : string;
}

export interface UserTokenCreationAttrs extends Optional<UserTokenAttrs, 'id'> {}

export class UserToken extends Model<UserTokenAttrs, UserTokenCreationAttrs> implements UserTokenAttrs {
    declare  id : number; // id
    declare public userId : number
    declare public isActivated : boolean;
    declare public refreshToken : string;
    declare public accessToken : string;
    declare public readonly createdAt : Date; // дата создания, при создании не указывать
    declare public readonly updatedAt : Date; // дата измненения, при создании не указывать
}