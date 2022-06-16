import express, {Router} from "express";
import {LocationRoute} from "../enums/routersType";
import {AuthMiddleware} from "../middlewares/authMiddleware";
import {CheckRoleMiddleware} from "../middlewares/checkRoleMiddleware";
import {UserRoleTypes} from "../models/types/userTypes";
import {locationController} from "../controllers/LocationController";

export const LocationRouter : Router = express.Router();

LocationRouter.get(
    LocationRoute.getAll,
    AuthMiddleware,
    locationController.getAll.bind(locationController)
);
LocationRouter.get(
    LocationRoute.getById,
    AuthMiddleware,
    locationController.getById.bind(locationController)
);
LocationRouter.post(
    LocationRoute.create,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    locationController.create.bind(locationController)
);
LocationRouter.put(
    LocationRoute.update,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    locationController.update.bind(locationController)
);
LocationRouter.delete(
    LocationRoute.remove,
    [AuthMiddleware,CheckRoleMiddleware(UserRoleTypes.organizer)],
    locationController.remove.bind(locationController)
);