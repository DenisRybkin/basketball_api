import { Request, Response, NextFunction } from "express"
import {userService} from "../services";
import {CookieControllerBase} from "./helpers/CookieControllerBase";

class AuthController extends CookieControllerBase  {

    async signup (req : Request, res : Response, next : NextFunction) {
        try {
            const body = req.body;
            const userData = await userService.signup(body);
            this.setCookie(res,"refreshToken",userData.tokens.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e.message);
        }
    }

    async login (req : Request, res : Response, next : NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            this.setCookie(res,"refreshToken",userData.tokens.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e.message);
        }
    }

    async logout (req : Request, res : Response, next : NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            // const token = await userService.logout(refreshToken);
            this.clearCookie(res,"refreshToken")
            return res.json("Успех")
        } catch (e) {
            next(e.message);
        }
    }

    async refresh (req : Request, res : Response, next : NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const newUser = await userService.signup(refreshToken);
            res.json(newUser);
        } catch (e) {
            next(e.message);
        }
    }
}

export const authController  = new AuthController() ;