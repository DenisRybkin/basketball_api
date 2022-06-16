import express, {Router} from "express";
import {TeamRoute} from "../enums/routersType";
import { teamController } from "../controllers";
import {AuthMiddleware} from "../middlewares/authMiddleware";

export const TeamRouter : Router = express.Router();

TeamRouter.get(TeamRoute.getAll, AuthMiddleware, teamController.getAll.bind(teamController));
TeamRouter.get(TeamRoute.getById, AuthMiddleware, teamController.getById.bind(teamController));
TeamRouter.post(TeamRoute.create, AuthMiddleware, teamController.create.bind(teamController));
TeamRouter.post(TeamRoute.addToTournament, AuthMiddleware, teamController.addToTournament);
TeamRouter.put(TeamRoute.update, AuthMiddleware, teamController.update.bind(teamController));
TeamRouter.delete(TeamRoute.remove, AuthMiddleware, teamController.remove.bind(teamController));