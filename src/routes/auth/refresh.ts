import {RouteHandler} from "../../interfaces/routeHandler";
import {HttpTypes} from "../../enums/httpTypes";
import {userService} from "../../services/user/userService";

export const authRefresh: RouteHandler = {
    url: "/refresh",
    requestType: HttpTypes.get,
    handler: async (req, res) => {
        try {
            const {refreshToken} = req.cookies;
            const newUser = await userService.signup(refreshToken);
            console.log(newUser,1111);
            res.json(newUser);
        } catch (e) {
            console.log(e.message);
        }
    }
}