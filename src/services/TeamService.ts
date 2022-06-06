import {Team, User} from "../models";
import {TeamAttrs} from "../models/team";
import {TeamDto} from "../dtos/TeamDto";

class TeamService {

    async getUsersByTeamId(teamId: number) {
        return await User.findAll({where: {teamId}})
    }

    async generateTeamWithParticipants(team: Team): Promise<TeamAttrs> {
        let teamWithParticipants = Object.create(Object.prototype);
        teamWithParticipants = team.toJSON();
        teamWithParticipants.participants = await this.getUsersByTeamId(team.id);
        console.log(teamWithParticipants);
        return teamWithParticipants;
    }

    async getAll(): Promise<TeamAttrs[] | null> {
        const teams = await Team.findAll();
        const teamsWithParticipants = [];
        for (const team of teams) {
            const teamWithParticipants = await this.generateTeamWithParticipants(team);
            teamsWithParticipants.push(teamWithParticipants);
        }
        return teamsWithParticipants;
    };

    async getById(id ?: number): Promise<TeamAttrs | null> {
        const team = await Team.findOne({where: {id: +id}});
        return await this.generateTeamWithParticipants(team);
    };

    async create(team: TeamDto): Promise<Team | null> {
        return await Team.create(team);
    };

    async update(teamId: number, team: Team): Promise<[affectedCount: number]> {
        const newTeam = await Team.update(
            {...team},
            {where: {id: teamId}}
        );
        return newTeam
    };

    async remove(userId: number): Promise<number> {
        return await Team.destroy({where: {id: userId}})
    };
}

export const teamService = new TeamService();