import {TeamInTournament} from "../models";
import {TeamInTournamentDto} from "../dtos/TeamInTournamentDto";
import {ApiError} from "../exceptions/apiError";


class TeamInTournamentService {

    async getTeam(teamId : number, tournamentId : number) : Promise<TeamInTournament> {
        try {
            return await TeamInTournament.findOne({where : {teamId, tournamentId}});
        } catch (e) {
            throw ApiError.BadRequest(`данная команда с id ${teamId} не найдена`)
        }
    }

    async getTeamId(teamId : number, tournamentId : number) : Promise<number | null> {
        try {
            const teamInTournament = await TeamInTournament.findOne({where : {teamId, tournamentId}});
            return teamInTournament.id;
        } catch (e) {
            throw ApiError.BadRequest(`данная команда с id ${teamId} не найдена`)
        }
    }

    async create(teamId : number, tournamentId : number, winningTeamId ?: number,countGame : number = 0) : Promise<TeamInTournament> {
        const currentTeamInTournament = await TeamInTournament.findOne({where : {teamId,tournamentId}});
        if(currentTeamInTournament) throw ApiError.BadRequest("команда уже участвует в этом турнире");
        const resultGame = {
            countGame,
            countWins : winningTeamId ? 0 : teamId === winningTeamId ? 1 : 0,
            countDefeats : winningTeamId ? 0 : teamId !== winningTeamId ? 0 : 1
        }
        const teamInTournamentDto = new TeamInTournamentDto(
            teamId,
            tournamentId,
            resultGame.countGame,
            resultGame.countWins,
            resultGame.countDefeats
        )
        return  await TeamInTournament.create(teamInTournamentDto);
    };

    async incrementWins (teamId : number, tournamentId : number) {
        const currentTeam = await TeamInTournament.findOne({where : {teamId,tournamentId}})
            ?? await  this.create(teamId,tournamentId,teamId,1);
        return await currentTeam.update(
            {countWins : currentTeam.countWins + 1, countGames : currentTeam.countGames +1},
            {where : {teamId}}
        );
    };

    async incrementDefeats (teamId : number, tournamentId : number) {
        const currentTeam = await TeamInTournament.findOne({where : {teamId,tournamentId}})
            ?? await  this.create(teamId,tournamentId,1);
        return await currentTeam.update(
            {countGames : currentTeam.countGames + 1, countDefeats : currentTeam.countDefeats + 1},
            {where : {teamId}}
        );
    };

    async remove(id : number) : Promise<number> {
        return await TeamInTournament.destroy({where : {id}})
    };

}

export const teamInTournamentService = new TeamInTournamentService();