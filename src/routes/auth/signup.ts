// Роуты (то, что можно запросить по ссылке
import { RouteHandler } from "../../interfaces/routeHandler";
import { HttpTypes } from "../../enums/httpTypes";
import {userService} from "../../services/user/userService";

export const authSignup: RouteHandler = {
    url: "/signup",
    requestType: HttpTypes.post,
    handler: async (req, res,next) => {
        try {
            const body = req.body;
            const userData = await userService.signup(body);
            const month = 39 *24 *60 * 60 * 1000;
            res.cookie('refreshToken',userData.tokens.refreshToken,
                {maxAge : month, httpOnly : true})
            return  res.json(userData);
        } catch (e) {
            next(e.message);
        }
    }
}