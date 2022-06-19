import express, { Application } from "express"
import { initDb } from './dataBase/db'
import {AuthRouter, UserRouter, TeamRouter} from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import {ApiErrorMiddleware} from "./middlewares/apiErrorMiddleware";
import {config} from "./config";
import {TournamentRouter} from "./routes/TournamentRouter";
import {LocationRouter} from "./routes/LocationRouter";
import {GameRouter} from "./routes/GameRouter";

export class App {
    private static _instance: App;
    private _app: Application;

    private constructor(
        private readonly _port: number = config.PORT,
        private readonly _prefix: string = config.API_PREFIX,
    ) {
        this._app = express();
        this.initMiddlewares();
        this.initRoutes();
        this.initLastMiddlewares();
    }

    public static get Instance(): App {
        return this._instance || (this._instance = new this());
    };

    private initMiddlewares(): void {
        this._app.use(express.json());
        this._app.use(cors());
        this._app.use((req, res, next) =>  {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            // @ts-ignore
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
        this._app.use(cookieParser());
    };

    private initLastMiddlewares(): void {
        this._app.use(ApiErrorMiddleware);
    };

    private initRoutes(): void {
        this._app.use(`${this._prefix}`, UserRouter);
        this._app.use(`${this._prefix}`, TeamRouter);
        this._app.use(`${this._prefix}`, AuthRouter);
        this._app.use(`${this._prefix}`, TournamentRouter);
        this._app.use(`${this._prefix}`, LocationRouter);
        this._app.use(`${this._prefix}`, GameRouter);
    };

    public async init(): Promise<void> {
        await initDb();
        this._app.listen(this._port, async () => {
            console.log(`server started at http://localhost:${ this._port }`);
        })
    };
}

const app = App.Instance;
app.init();