import {NextFunction, Request, Response} from "express";
import {getToken} from "../utils/getToken";
import {ApiError} from "../exceptions/apiError";
import {tokenService} from "../services";


export const CheckRoleMiddleware = (role : string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const accessToken = getToken(req);
            if (!accessToken) next(ApiError.UnauthorizedError());
            const permission = tokenService.checkRole(accessToken,role);
            if (!permission) next(ApiError.Forbidden());
            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    }
}
