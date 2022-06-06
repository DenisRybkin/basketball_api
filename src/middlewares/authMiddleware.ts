import {NextFunction, Request, Response} from "express";
import {ApiError} from "../exceptions/apiError";
import {getToken} from "../utils/getToken";
import {tokenService} from "../services/tokenService/tokenService";

export const AuthMiddleware = (req : Request, res : Response, next :NextFunction) => {

      const checkSkip = () => {
            if (req.method === 'OPTIONS') return next();
            switch (req.url) {
                  case "/signup" : {
                        next();
                        break;
                  }
                  case "/login" : return true;
                  case "/logout" : return true;
                  case "/refresh" : return true;
                  default : return false;
            }
      }
      if(!checkSkip()){
            if (req.method === 'OPTIONS'  || req.url === "/signup") return next();
            try {
                  console.log(req.url);
                  const accessToken = getToken(req);
                  if(!accessToken) next(ApiError.UnauthorizedError());

                  const validToken = tokenService.validateAccessToken(accessToken)
                  if(!validToken) next(ApiError.UnauthorizedError());

            } catch (e) {
                  return next(ApiError.UnauthorizedError())
            }
      }
}