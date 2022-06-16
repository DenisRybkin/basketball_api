export class TeamInTournamentDto {
    public teamId : number;
    public tournamentId : number;
    public countGames : number;
    public countWins : number;
    public countDefeats : number;

    constructor(teamId : number, tournamentId : number,countGames : number,countWins : number,countDefeats : number) {
        this.teamId = teamId;
        this.tournamentId = tournamentId;
        this.countWins = countWins;
        this.countDefeats = countDefeats;
        this.countGames = countGames;
    }
}