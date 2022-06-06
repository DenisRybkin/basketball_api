import express from "express"
import { initDb } from './dataBase/db'
import {AuthRouter, UserRouter, TeamRouter} from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import {ApiErrorMiddleware} from "./middlewares/apiErrorMiddleware";

export const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", AuthRouter);
app.use("/api", UserRouter);
app.use("/api", TeamRouter)
app.use(ApiErrorMiddleware)
dotenv.config()

// const routeHandlerMapper: Partial<Record<HttpTypes, (v: RouteHandler) => void>> = {
//     [HttpTypes.get]: (v) => app.get(v.url, v.handler),
//     [HttpTypes.post]: (v) => app.post(v.url, v.handler),
//     [HttpTypes.put]: (v) => app.put(v.url, v.handler),
//     [HttpTypes.patch]: (v) => app.patch(v.url, v.handler),
//     [HttpTypes.delete]: (v) => app.delete(v.url, v.handler),
// }

// routeHandlers.forEach(x => routeHandlerMapper[x.requestType](x));
// define a route handler for the default home page
app.get("/", async (req, res) => {
    res.send("Hello world!");
});

console.log(process.env.JWT_ACCESS_SECRET);

// start the Express server
app.listen(port, async () => {
    await initDb()
    console.log(`server started at http://localhost:${ port }`);
});