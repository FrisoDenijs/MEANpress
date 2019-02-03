import * as express from 'express';
import * as bodyParser from "body-parser";
import { mountTestRoutes } from './routes';

const env = process.env.ENVIRONMENT || 'debug';

//based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
export class App {
    public express;

    public constructor() {
        this.express = express();
        this.preRoutes();
        this.mountRoutes();
    }

    private preRoutes() {
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));

        this.express.use(bodyParser.json());
    }

    private mountRoutes(): void {
        const router = express.Router();

        if (env === 'debug' || env === 'test'){
            mountTestRoutes(router);
        }

        this.express.use('/api', router);
    }
}