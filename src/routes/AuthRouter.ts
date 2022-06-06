import express, {Router}  from "express";
import {AuthRoute} from "../enums/routersType";
import {authController} from "../controllers";

export const AuthRouter : Router = express.Router();

AuthRouter.post(AuthRoute.signup, authController.signup.bind(authController));
AuthRouter.post(AuthRoute.login, authController.login.bind(authController));
AuthRouter.post(AuthRoute.logout, authController.logout.bind(authController));
AuthRouter.get(AuthRoute.refresh, authController.refresh.bind(authController))