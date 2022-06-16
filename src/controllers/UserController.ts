import { Request, Response, NextFunction } from "express";
import {userService} from "../services";
import {ApiError} from "../exceptions/apiError";
import {getIdFromReq, getIdFromParams} from "../utils/getIdFromReq";

export class UserController {

    async getAll (req : Request, res : Response, next : NextFunction) {
        try {
            // обращаемся к нашему сервису, который отдаёт всех пользователй
            const users = await userService.getAll();
            res.json(users)
        } catch (e) {
            next(e);
        }
    }

    async getById (req : Request, res : Response, next : NextFunction) {
        try {
            const id : number = getIdFromParams(req);
            if(!id) throw ApiError.BadRequest("нема айдишника")
            const user = await userService.getById(id);
            if(!user) throw ApiError.NotFound();
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async update (req : Request, res : Response, next : NextFunction) {
        try {
            const newUserId = getIdFromReq(req);
            const newUser = req.body;
            if(!newUserId) ApiError.BadRequest("нема айдишника");
            const updatedId =  await userService.update(+newUserId,newUser);
            res.json(updatedId)
        } catch (e) {
            next(e);
        }
    }

    async remove (req : Request, res : Response, next : NextFunction) {
        try {
            const deletingUserId = getIdFromReq(req);
            if(!deletingUserId) ApiError.BadRequest("нема айдишника");
            const deletedId = await userService.remove(+deletingUserId);
            res.json(deletedId);
        } catch (e) {
            next(e);
        }
    }

}

export const userController = new UserController();