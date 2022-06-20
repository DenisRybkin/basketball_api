import {NextFunction, Request, Response} from "express";
import {teamInTournamentService} from "../services/TeamInTournamentService";
import {TeamInTournamentFilters} from "./filters/teamInTournamentFilters";


class TeamInTournamentController {
    async getAll (req : Request, res : Response, next : NextFunction) {
        try {
            // обращаемся к нашему сервису, который отдаёт все команды
            const params : TeamInTournamentFilters = req.query;
            const teams = params.tournamentId
                ? await teamInTournamentService.getAllByIdTournament(+params.tournamentId)
                : await teamInTournamentService.getAll();
            res.json(teams);
        } catch (e) {
            next(e);
        }
    }
}

export const teamInTournamentController = new TeamInTournamentController();