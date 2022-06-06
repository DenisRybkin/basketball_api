import {DataTypes} from "sequelize";
import {Team, User, Game, Tournament, TeamInTournament,Location,UserToken} from "../models";
import {db} from "./db";


// описываю модели (таблицы) для postgresSQL

export async function defineModels() {

    await Team.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {type: DataTypes.DATE},
        updatedAt: {type: DataTypes.DATE}
    }, {sequelize: db, createdAt: true, updatedAt: true, tableName: "team"});

    await Tournament.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {type: DataTypes.DATE},
        updatedAt: {type: DataTypes.DATE}
    }, {sequelize: db, createdAt: true, updatedAt: true, tableName: "tournament"})

    await User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        amplua : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isActivated : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false
        },

    }, {sequelize: db, createdAt: true, updatedAt: true, tableName: "user"});


    await Game.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        team1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // primaryKey: true
        },
        team2Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // primaryKey: true
        },
        countPointsTeam1 : {
            type: DataTypes.INTEGER,
            defaultValue : 0
        },
        countPointsTeam2 : {
            type: DataTypes.INTEGER,
            defaultValue : 0
        },
        winningTeamId : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateEvent : {
            type: DataTypes.STRING,
            allowNull: false
        },
        tournamentId : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        locationId : {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {sequelize: db, createdAt: true, updatedAt: true, tableName: "game"});

    await TeamInTournament.init({
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        teamId : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tournamentId : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        countWins : {
            type: DataTypes.INTEGER,
            defaultValue : 0,
            allowNull: false
        },
        countGames : {
            type: DataTypes.INTEGER,
            defaultValue : 0,
            allowNull: false
        },
        countDefeats : {
            type: DataTypes.INTEGER,
            defaultValue : 0,
            allowNull: false
        },
        points : {
            type: DataTypes.INTEGER,
            defaultValue : 0,
            allowNull: false
        }
    }, {sequelize: db, createdAt: true, updatedAt: true, tableName: "teamInTournament"});

    await Location.init({
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacity : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        contact : {
            type: DataTypes.STRING,
            allowNull: false
        },
        address : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {sequelize: db, createdAt: true, updatedAt: true, tableName: "location"});

    UserToken.init({
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActivated: {
            type : DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue : false
        },
    },{sequelize: db, createdAt: true, updatedAt: true, tableName: "userToken"})
}