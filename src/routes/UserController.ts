import express, {Router} from "express";
import {UserRoute} from "../enums/routersType";
import { userController } from "../controllers";
import {AuthMiddleware} from "../middlewares/authMiddleware";

export const UserRouter : Router = express.Router();

UserRouter.get(UserRoute.getAll, AuthMiddleware, userController.getAll.bind(userController));
UserRouter.get(UserRoute.getById, AuthMiddleware, userController.getById.bind(userController));
UserRouter.put(UserRoute.update,AuthMiddleware, userController.update.bind(userController));
UserRouter.delete(UserRoute.remove, AuthMiddleware, userController.remove.bind(userController));