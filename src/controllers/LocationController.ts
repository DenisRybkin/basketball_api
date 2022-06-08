import {NextFunction, Request, Response} from "express";
import {getIdFromParams, getIdFromReq} from "../utils/getIdFromReq";
import {ApiError} from "../exceptions/apiError";
import {locationService} from "../services/LocationService";
import {LocationDto} from "../dtos/LocationDto";


class LocationController {
    async getAll (req : Request, res : Response, next : NextFunction) {
        try {
            // обращаемся к нашему сервису, который отдаёт все команды
            const locations = await locationService.getAll();
            res.json(locations)
        } catch (e) {
            next(e);
        }
    }

    async getById (req : Request, res : Response, next : NextFunction) {
        try {
            const id : number = getIdFromParams(req);
            if(!id) throw ApiError.BadRequest("нема айдишника")
            const team = await locationService.getById(id);
            if(!team) throw ApiError.NotFound();
            res.json(team);
        } catch (e) {
            next(e);
        }
    }

    async create  (req : Request, res : Response, next : NextFunction) {
        try {
            const locationDto = new LocationDto(req.body.name,req.body.capacity,req.body.address, req.body.contact);
            const location = await locationService.create(locationDto);
            res.json(location);
        }
        catch (e) {
            next(e)
        }
    }

    async update (req : Request, res : Response, next : NextFunction) {
        try {
            const locationId = getIdFromReq(req);
            const newLocation = req.body;
            if(!locationId) ApiError.BadRequest("нема айдишника");
            const updatedId =  await locationService.update(+locationId,newLocation);
            res.json(updatedId)
        } catch (e) {
            next(e);
        }
    }

    async remove (req : Request, res : Response, next : NextFunction) {
        try {
            const deletingLocationId = getIdFromReq(req);
            if(!deletingLocationId)  ApiError.BadRequest("нема айдишника");
            const deletedId = await locationService.remove(+deletingLocationId);
            res.json(deletedId);
        } catch (e) {
            next(e);
        }
    }
}

export const locationController = new LocationController();