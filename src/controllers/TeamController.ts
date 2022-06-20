import { Request, Response, NextFunction } from "express";
import {ApiError} from "../exceptions/apiError";
import {teamService} from "../services";
import {TeamDto} from "../dtos/TeamDto";
import {getIdFromReq, getIdFromParams} from "../utils/getIdFromReq";
import {TeamFilters} from "./filters/teamFilters";

class TeamController {
    async getAll (req : Request, res : Response, next : NextFunction) {
        try {
            // обращаемся к нашему сервису, который отдаёт все команды
            const filterParams : TeamFilters = req.query;
            console.log(filterParams);
            const teams = filterParams.tournamentId
                ? await teamService.getTeamsByTournamentId(+filterParams.tournamentId)
                : await teamService.getAll();
            res.json(teams)
        } catch (e) {
            next(e);
        }
    }

    async getById (req : Request, res : Response, next : NextFunction) {
        try {
            const id : number = getIdFromParams(req);
            if(!id) throw ApiError.BadRequest("нема айдишника")
            const team = await teamService.getById(id);
            if(!team) throw ApiError.NotFound();
            res.json(team);
        } catch (e) {
            next(e);
        }
    }

    async create (req : Request, res : Response, next : NextFunction) {
        try {
            const teamDto = new TeamDto(req.body.name,req.body.address);
            const team = await teamService.create(teamDto);
            res.json(team);
        }
        catch (e) {
            next(e)
        }
    }

    async addToTournament (req : Request, res : Response, next : NextFunction) {
        try {
            const {teamId, tournamentId} = req.body
            const teamInTournament = await teamService.addToTournament(teamId,tournamentId);
            res.json(teamInTournament);
        } catch (e) {
            next(e)
        }
    }

    async update (req : Request, res : Response, next : NextFunction) {
        try {
            const teamId = getIdFromReq(req);
            const newTeam = req.body;
            if(!teamId) ApiError.BadRequest("нема айдишника");
            const updatedId =  await teamService.update(+teamId,newTeam);
            res.json(updatedId)
        } catch (e) {
            next(e);
        }
    }

    async remove (req : Request, res : Response, next : NextFunction) {
        try {
            const deletingTeamId = getIdFromReq(req);
            if(!deletingTeamId)  ApiError.BadRequest("нема айдишника");
            const deletedId = await teamService.remove(+deletingTeamId);
            res.json(deletedId);
        } catch (e) {
            next(e);
        }
    }
}
export const teamController = new TeamController()