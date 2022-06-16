import {GameAttrs} from "../models/game";

export class GameDto {

    public team1Id : number;
    public team2Id : number;
    public countPointsTeam1 : number;
    public countPointsTeam2 : number;
    public winningTeamId : number;
    public dateEvent : string;
    public tournamentId : number;
    public locationId : number;

    set setTeam1Id (team1Id : number)  {
        this.team1Id = team1Id;
    }

    set setTeam2Id (team2Id : number) {
        this.team2Id = team2Id;
    }

    set setWinningTeamId(teamId : number) {
        this.winningTeamId = teamId;
    }

    constructor(attrs : GameAttrs) {
        this.team1Id = attrs.team1Id
        this.team2Id = attrs.team2Id
        this.countPointsTeam1 = attrs.countPointsTeam1
        this.countPointsTeam2 = attrs.countPointsTeam2
        this.winningTeamId = attrs.winningTeamId
        this.dateEvent = attrs.dateEvent
        this.tournamentId = attrs.tournamentId
        this.locationId = attrs.locationId
    }

}