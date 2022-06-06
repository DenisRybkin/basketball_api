import {ApiError} from "../exceptions/apiError";
import {Request, Response,NextFunction } from "express";


export const ApiErrorMiddleware = (err : Error, req : Request, res : Response, next :NextFunction) => {

    if(err instanceof ApiError) {
        return res.status(err.status).json({message : err.message});
    }
    return res.status(500).json({message : err ?? "необработанная ошибка" })
}