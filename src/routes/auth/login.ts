// Роуты (то, что можно запросить по ссылке
import { RouteHandler } from "../../interfaces/routeHandler";
import { HttpTypes } from "../../enums/httpTypes";
import {userService} from "../../services/user/userService";

export const authLogin : RouteHandler = {
    url: "/login",
    requestType: HttpTypes.post,
    handler: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            const month = 39 *24 *60 * 60 * 1000;
            res.cookie('refreshToken',userData.tokens.refreshToken,
                {maxAge : month, httpOnly : true})
            return  res.json(userData);
        } catch (e) {
            next(e.message);
        }
    }
}