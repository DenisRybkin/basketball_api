import {Team, TeamInTournament, Tournament, User} from "../models";
import {TeamAttrs} from "../models/team";
import {TeamDto} from "../dtos/TeamDto";
import {ApiError} from "../exceptions/apiError";
import {teamInTournamentService} from "./TeamInTournamentService";
import {TeamFilters} from "../controllers/filters/teamFilters";
import {noRawAttributes} from "sequelize/types/utils/deprecations";

class TeamService {

    async getAll(): Promise<TeamAttrs[] | null> {
        return await Team.findAll({include: [
                {model: User, isSelfAssociation: true, as: 'participants'},
                {model: TeamInTournament, isSelfAssociation: true, as: 'tournamentTeam'}
            ]})
    };

    async getTeamsByTournamentId(tournamentId : number) {
        const teams : TeamAttrs[] = [];
        const getAll = async (teamsId : number[]) => {
            for (const i of teamsId) {
                const team = await this.getById(+i);
                teams.push(team)
            }
        }
        const necessaryTeams = await TeamInTournament.findAll({where : {tournamentId}});
        await getAll(necessaryTeams.map(item => item.teamId));
        return teams;
    }

    async getById(id ?: number): Promise<TeamAttrs | null> {
        return await Team.findOne({
            where: {id: +id},
            include: [
                {model: User, isSelfAssociation: true, as: 'participants'},
                {model: TeamInTournament, isSelfAssociation: true, as: 'tournamentTeam'}
            ]
        });
    };

    async create(team: TeamDto): Promise<Team | null> {
        return await Team.create(team);
    };

    async addToTournament(teamId : number, tournamentId : number) : Promise<TeamInTournament> {
        const currentTeam = await Team.findOne({ where : {id :teamId}});
        if(!teamId || !currentTeam) throw ApiError.BadRequest('Такой команды не существует ((');
        return await teamInTournamentService.create(teamId,tournamentId);
    }

    async update(teamId: number, team: Team): Promise<[affectedCount: number]> {
        return await Team.update(
            {...team},
            {where: {id: teamId}}
        )
    };

    async remove(teamId: number): Promise<number> {
        return await Team.destroy({where: {id: teamId}})
    };
}

export const teamService = new TeamService();