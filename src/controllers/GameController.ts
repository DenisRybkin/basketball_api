import {NextFunction, Request, Response} from "express";
import {getIdFromParams, getIdFromReq} from "../utils/getIdFromReq";
import {ApiError} from "../exceptions/apiError";
import {gameService} from "../services/GameService";
import {GameDto} from "../dtos/GameDto";


export class GameController {
    async getAll (req : Request, res : Response, next : NextFunction) {
        try {
            // обращаемся к нашему сервису, который отдаёт все команды
            const games = await gameService.getAll();
            res.json(games)
        } catch (e) {
            next(e);
        }
    }

    async getById (req : Request, res : Response, next : NextFunction) {
        try {
            const id : number = getIdFromParams(req);
            if(!id) throw ApiError.BadRequest("нема айдишника")
            const game = await gameService.getById(id);
            if(!game) throw ApiError.NotFound();
            res.json(game);
        } catch (e) {
            next(e);
        }
    }

    async create  (req : Request, res : Response, next : NextFunction) {
        try {
            const gameDto = new GameDto(req.body);
            const game = await gameService.create(gameDto);
            res.json(game);
        }
        catch (e) {
            next(e)
        }
    }

    async update (req : Request, res : Response, next : NextFunction) {
        try {
            const gameId = getIdFromReq(req);
            const newGame = req.body;
            if(!gameId) ApiError.BadRequest("нема айдишника");
            const updatedId =  await gameService.update(+gameId,newGame);
            res.json(updatedId)
        } catch (e) {
            next(e);
        }
    }

    async remove (req : Request, res : Response, next : NextFunction) {
        try {
            const deletingGameId = getIdFromReq(req);
            if(!deletingGameId)  ApiError.BadRequest("нема айдишника");
            const deletedId = await gameService.remove(+deletingGameId);
            res.json(deletedId);
        } catch (e) {
            next(e);
        }
    }
}

export const gameController = new GameController();