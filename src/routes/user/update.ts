// Роуты (то, что можно запросить по ссылке
import { RouteHandler } from "../../interfaces/routeHandler";
import { HttpTypes } from "../../enums/httpTypes";
import {userService} from "../../services/user/userService";
import {ApiError} from "../../exceptions/apiError";
import {log} from "util";

export const userUpdate: RouteHandler = {
    url: "/user",
    requestType: HttpTypes.put,
    handler: async (req, res,next) => {
        try {

            const newUser = req.body;
            console.log(1,newUser,newUser.id);
            if(!newUser.id) ApiError.BadRequest("нема айдишника");
            const updatedId =  await userService.update(+newUser.id,newUser);
            res.json(updatedId)
        } catch (e) {
            next(e);
        }
    }
}