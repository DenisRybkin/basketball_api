import express, {Router} from "express";
import { TournamentRoute } from "../enums/routersType";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {tournamentController} from "../controllers/TournamentController";
import {CheckRoleMiddleware} from "../middlewares/checkRoleMiddleware";
import {UserRoleTypes} from "../models/types/userTypes";

export const TournamentRouter : Router = express.Router();

TournamentRouter.get(
    TournamentRoute.getAll,
    AuthMiddleware,
    tournamentController.getAll.bind(tournamentController)
);
TournamentRouter.get(
    TournamentRoute.getById,
    AuthMiddleware,
    tournamentController.getById.bind(tournamentController)
);
TournamentRouter.post(
    TournamentRoute.create,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    tournamentController.create.bind(tournamentController)
);
TournamentRouter.put(
    TournamentRoute.update,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    tournamentController.update.bind(tournamentController)
);
TournamentRouter.delete(
    TournamentRoute.remove,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    tournamentController.remove.bind(tournamentController)
);