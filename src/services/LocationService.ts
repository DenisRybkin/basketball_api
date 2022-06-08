import {Location, LocationAttrs} from "../models/location";
import {Game, Team} from "../models";
import {TeamAttrs} from "../models/team";
import {LocationDto} from "../dtos/LocationDto";


class LocationService {

    async getAll() : Promise<LocationAttrs[] | null> {
        return await Location.findAll({include: [{model: Game, isSelfAssociation: true, as: 'games'}]})
    }

    async getById(id ?: number): Promise<TeamAttrs | null> {
        return await Location.findOne({
            where: {id: +id},
            include: [{model: Game, isSelfAssociation: true, as: 'games'}]
        });
    };

    async create(location: LocationDto): Promise<Location | null> {
        return await Location.create(location);
    };

    async update(locationId: number, location: Location): Promise<[affectedCount: number]> {
        return await Team.update(
            {...location},
            {where: {id: locationId}}
        )
    };

    async remove(locationId: number): Promise<number> {
        return await Location.destroy({where: {id: locationId}})
    };
}

export const locationService = new LocationService()