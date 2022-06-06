// тут в массив складываются все хендлеры
import { userByIdGet } from "./user/getById";
import { userGetAll } from "./user/getAll";
import { authSignup } from "./auth/signup";
import { authLogin } from "./auth/login"
import { authLogout } from "./auth/logout"
import { userUpdate } from "./user/update";
import { userRemove } from "./user/remove";
export const routeHandlers = [
    userByIdGet,
    userGetAll,
    userUpdate,
    userRemove,
    authSignup,
    authLogin,
    authLogout,
];