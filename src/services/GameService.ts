import {Game, Team, TeamInTournament} from "../models";
import {GameDto} from "../dtos/GameDto";
import {GameAttrs} from "../models/game";
import {teamInTournamentService} from "./TeamInTournamentService";
import {GameFilters} from "../controllers/filters/gameFilters";

class GameService {

    async getAll(params?: GameFilters): Promise<GameAttrs[]> {
        return await Game.findAll( {where : {...params},include: [
                {model: TeamInTournament, as: 'team1',identifier : 'team1Id', include : [
                    {model : Team, isSelfAssociation: true, as : 'tournamentTeam',identifier : 'teamId' }
                    ]
                },
                {model: TeamInTournament, as: 'team2',identifier : 'team2Id', include : [
                    {model : Team, isSelfAssociation: true, as : 'tournamentTeam',identifier : 'teamId' }
                    ]}
            ]});
    };

    async getById(id ?: number): Promise<GameAttrs> {
        return await Game.findOne({
            where: {id: +id},
            include: [{model: TeamInTournament, as: 'team1',identifier : 'team1Id', include : [
                    {model : Team, isSelfAssociation: true, as : 'tournamentTeam',identifier : 'teamId' }
                ]
            },
                {model: TeamInTournament, as: 'team2',identifier : 'team2Id', include : [
                        {model : Team, isSelfAssociation: true, as : 'tournamentTeam',identifier : 'teamId' }
                    ]}]
        });
    };

    async refreshTeamsId(game: GameDto) : Promise<GameDto> {
        const team1Id = await teamInTournamentService.getTeamId(game.team1Id, game.tournamentId);
        const team2Id = await teamInTournamentService.getTeamId(game.team2Id, game.tournamentId);
        const winningTeamId = await teamInTournamentService.getTeamId(game.winningTeamId, game.tournamentId);
        game.setTeam1Id = team1Id;
        game.setTeam2Id = team2Id;
        game.setWinningTeamId = winningTeamId;
        return game;
    }

    async create(game: GameDto): Promise<Game | null> {
        await this.refreshTeamsId(game);
        await teamInTournamentService.incrementDefeats(
            (game.winningTeamId !== game.team1Id ? game.team1Id : game.team2Id),
            game.tournamentId
        );
        await teamInTournamentService.incrementWins(
            (game.winningTeamId === game.team1Id ? game.team1Id : game.team2Id),
            game.tournamentId
        );
        return await Game.create(game);
    };

    async update(gameId: number, game: GameDto): Promise<[affectedCount: number]> {
        await this.refreshTeamsId(game);
        return await Game.update(
            {...game},
            {where: {id: gameId}}
        )
    };

    async remove(gameId: number): Promise<number> {
        return await Game.destroy({where: {id: gameId}})
    };
}

export const gameService = new GameService();