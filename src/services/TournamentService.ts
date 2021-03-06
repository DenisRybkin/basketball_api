import {Tournament, TournamentAttrs} from "../models/tournament";
import {TournamentDto} from "../dtos/TournamentDto";
import {Game, User} from "../models";

class TournamentService {

    async getAll(): Promise<TournamentAttrs[] | null> {
        return await Tournament.findAll({include: [{model: Game, isSelfAssociation: true, as: 'games'},{model: User, isSelfAssociation: true, as: 'creator'}]})
    };

    async getById(id ?: number): Promise<TournamentAttrs | null> {
        return await Tournament.findOne({
            where: {id: +id},
            include: [
                {model: Game, isSelfAssociation: true, as: 'games'},
                {model: User, isSelfAssociation: true, as: 'creator'},
            ]
        });
    };

    async create(tournament: TournamentDto): Promise<Tournament | null> {
        return await Tournament.create(tournament);
    };

    // async appendGame (tournamentId : number) {
    //
    // }

    async update(tournamentId: number, tournament: Tournament): Promise<[affectedCount: number]> {
        return await Tournament.update(
            {...tournament},
            {where: {id: tournamentId}}
        )
    };

    async remove(tournamentId: number): Promise<number> {
        return await Tournament.destroy({where: {id: tournamentId}})
    };
}

export const tournamentService = new TournamentService();