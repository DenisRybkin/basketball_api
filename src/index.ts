import express from "express"
import { initDb } from './dataBase/db'
import { routeHandlers } from "./routes";
import { HttpTypes } from "./enums/httpTypes";
import { RouteHandler } from "./interfaces/routeHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import {ApiMiddleware} from "./middlewares/apiMiddleware";
import {AuthMiddleware} from "./middlewares/authMiddleware";

export const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(AuthMiddleware);
app.use(ApiMiddleware)
dotenv.config()

console.log(cookieParser,1111);

const routeHandlerMapper: Partial<Record<HttpTypes, (v: RouteHandler) => void>> = {
    [HttpTypes.get]: (v) => app.get(v.url, v.handler),
    [HttpTypes.post]: (v) => app.post(v.url, v.handler),
    [HttpTypes.put]: (v) => app.put(v.url, v.handler),
    [HttpTypes.patch]: (v) => app.patch(v.url, v.handler),
    [HttpTypes.delete]: (v) => app.delete(v.url, v.handler),
}

routeHandlers.forEach(x => routeHandlerMapper[x.requestType](x))
// define a route handler for the default home page
app.get("/", async (req, res) => {
    res.send("Hello world!");
});

console.log(process.env.JWT_ACCESS_SECRET,11111111111111);

// start the Express server
app.listen(port, async () => {
    await initDb()
    console.log(`server started at http://localhost:${ port }`);
});