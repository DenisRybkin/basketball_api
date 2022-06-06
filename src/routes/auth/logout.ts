// Роуты (то, что можно запросить по ссылке
import { RouteHandler } from "../../interfaces/routeHandler";
import { HttpTypes } from "../../enums/httpTypes";
import {userService} from "../../services/user/userService";

export const authLogout : RouteHandler = {
    url: "/logout",
    requestType: HttpTypes.post,
    handler: async (req, res,next) => {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.json(token)
        } catch (e) {
            next(e.message);
        }
    }
}