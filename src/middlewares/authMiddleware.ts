import {NextFunction, Request, Response} from "express";
import {ApiError} from "../exceptions/apiError";
import {getToken} from "../utils/getToken";
import {tokenService} from "../services";
import {CheckRoleMiddleware} from "./checkRoleMiddleware";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS' || req.url === "/signup") return next();
    try {
        const accessToken = getToken(req);
        if (!accessToken) next(ApiError.UnauthorizedError());
        const validToken = tokenService.validateAccessToken(accessToken);
        if (!validToken) next(ApiError.UnauthorizedError());

        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }

}