import {Team, User} from "../models";
import {TeamAttrs} from "../models/team";
import {TeamDto} from "../dtos/TeamDto";

class TeamService {

    async getAll(): Promise<TeamAttrs[] | null> {
        return await Team.findAll({include: [{model: User, isSelfAssociation: true, as: 'participants'}]})
    };

    async getById(id ?: number): Promise<TeamAttrs | null> {
        return await Team.findOne({
            where: {id: +id},
            include: [{model: User, isSelfAssociation: true, as: 'participants'}]
        });
    };

    async create(team: TeamDto): Promise<Team | null> {
        return await Team.create(team);
    };

    async update(teamId: number, team: Team): Promise<[affectedCount: number]> {
        return await Team.update(
            {...team},
            {where: {id: teamId}}
        )
    };

    async remove(userId: number): Promise<number> {
        return await Team.destroy({where: {id: userId}})
    };
}

export const teamService = new TeamService();