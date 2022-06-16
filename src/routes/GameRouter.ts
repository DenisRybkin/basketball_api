import express, {Router} from "express";
import {GameRoute} from "../enums/routersType";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {CheckRoleMiddleware} from "../middlewares/checkRoleMiddleware";
import {UserRoleTypes} from "../models/types/userTypes";
import {gameController} from "../controllers/GameController";

export const GameRouter : Router = express.Router();

GameRouter.get(
    GameRoute.getAll,
    AuthMiddleware,
    gameController.getAll.bind(gameController)
);
GameRouter.get(
    GameRoute.getById,
    AuthMiddleware,
    gameController.getById.bind(gameController)
);
GameRouter.post(
    GameRoute.create,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    gameController.create.bind(gameController)
);
GameRouter.put(
    GameRoute.update,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    gameController.update.bind(gameController)
);
GameRouter.delete(
    GameRoute.remove,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    gameController.remove.bind(gameController)
);