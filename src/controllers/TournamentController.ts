import {TournamentDto} from "../dtos/TournamentDto";
import {NextFunction, Request, Response} from "express";
import {getIdFromParams, getIdFromReq} from "../utils/getIdFromReq";
import {ApiError} from "../exceptions/apiError";
import {tournamentService} from "../services/TournamentService";

class TournamentController {

    async getAll (req : Request, res : Response, next : NextFunction) {
        try {
            // обращаемся к нашему сервису, который отдаёт все команды
            const tournaments = await tournamentService.getAll();
            return res.json(tournaments);
        } catch (e) {
            next(e);
        }
    }

    async getById (req : Request, res : Response, next : NextFunction) {
        try {
            const id : number = getIdFromParams(req);
            if(!id) throw ApiError.BadRequest("нема айдишника")
            const tournament = await tournamentService.getById(id);
            if(!tournament) throw ApiError.NotFound();
            return res.json(tournament);
        } catch (e) {
            next(e);
        }
    }

    async create  (req : Request, res : Response, next : NextFunction) {
        try {
            const tournamentDto = new TournamentDto(req.body.name,req.body.address, req.body.userId);
            const team = await tournamentService.create({...tournamentDto});
            return  res.json(team);
        }
        catch (e) {
            next(e);
        }
    }

    async update (req : Request, res : Response, next : NextFunction) {
        try {
            const tournamentId = getIdFromReq(req);
            const newTournament = req.body;
            if(!tournamentId) ApiError.BadRequest("нема айдишника");
            const updatedId =  await tournamentService.update(+tournamentId,newTournament);
            return  res.json(updatedId)
        } catch (e) {
            next(e);
        }
    }

    async remove (req : Request, res : Response, next : NextFunction) {
        try {
            const deletingUserId = getIdFromReq(req);
            if(!deletingUserId)  ApiError.BadRequest("нема айдишника");
            const deletedId = await tournamentService.remove(+deletingUserId);
            res.json(deletedId);
        } catch (e) {
            next(e);
        }
    }
}

export const tournamentController = new TournamentController();