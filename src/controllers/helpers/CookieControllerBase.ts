import {Response} from "express";

export abstract class CookieControllerBase {

     setCookie (res : Response, cookieKey : string,cookieValue : string,  age ?: number, httpOnly : boolean = true) {
        const maxAge = age ?? 39 * 24 *60 * 60 * 1000;
        res.cookie(cookieKey,cookieValue,
            {maxAge, httpOnly})
    }

    clearCookie (res : Response,cookieKey :  string) {
        res.clearCookie(cookieKey);
    }
}
