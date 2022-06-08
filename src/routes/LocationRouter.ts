import express, {Router} from "express";
import {LocationRoute} from "../enums/routersType";
import { teamController } from "../controllers";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {CheckRoleMiddleware} from "../middlewares/checkRoleMiddleware";
import {UserRoleTypes} from "../models/types/userTypes";
import {locationController} from "../controllers/LocationController";

export const LocationRouter : Router = express.Router();

LocationRouter.get(
    LocationRoute.getAll,
    AuthMiddleware,
    locationController.getAll.bind(teamController)
);
LocationRouter.get(
    LocationRoute.getById,
    AuthMiddleware,
    locationController.getById.bind(teamController)
);
LocationRouter.post(
    LocationRoute.create,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    locationController.create.bind(teamController)
);
LocationRouter.put(
    LocationRoute.update,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    locationController.update.bind(teamController)
);
LocationRouter.delete(
    LocationRoute.remove,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    locationController.remove.bind(teamController)
);