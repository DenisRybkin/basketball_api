// роут хендлер
import { RouteHandler } from "../../interfaces/routeHandler";
import { HttpTypes } from "../../enums/httpTypes";

import {userService} from "../../services/user/userService";
import {ApiError} from "../../exceptions/apiError";

export const userByIdGet: RouteHandler = {
    url: "/user/:id",
    requestType: HttpTypes.get,
    handler: async (req, res,next) => {
        try {
            const id : string = req.params.id
            if(!id) throw ApiError.BadRequest("нема айдишника")
            const users = userService.getById(id);
            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}