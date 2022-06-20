import express, {Router} from "express";
import {TeamInTournamentRoute} from "../enums/routersType";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {teamInTournamentController} from "../controllers/TeamInTournamentController";


export const TeamInTournamentRouter : Router = express.Router();

TeamInTournamentRouter.get(TeamInTournamentRoute.getAll,AuthMiddleware,teamInTournamentController.getAll.bind(teamInTournamentController))