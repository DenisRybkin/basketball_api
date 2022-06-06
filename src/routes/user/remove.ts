// Роуты (то, что можно запросить по ссылке
import { RouteHandler } from "../../interfaces/routeHandler";
import { HttpTypes } from "../../enums/httpTypes";
import {userService} from "../../services/user/userService";
import {ApiError} from "../../exceptions/apiError";

export const userRemove: RouteHandler = {
    url: "/user",
    requestType: HttpTypes.delete,
    handler: async (req, res,next) => {
        try {
            const deletingUserId = req.body.id;
            if(!deletingUserId)  ApiError.BadRequest("нема айдишника");
            const deletedId = userService.remove(+deletingUserId);
            res.json("успех, бро");
        } catch (e) {
            next(e);
        }
    }
}