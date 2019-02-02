import * as express from 'express';
import * as bodyParser from "body-parser";
import { TestController } from './controllers';
import { Container } from 'inversify';

//based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
export class App {
    public express;

    public constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();

        this.express.use(bodyParser.urlencoded({
            extended: false
         }));
         
        this.express.use(bodyParser.json());

        router.get('/test', (req, res) => {
            res.json(TestController.Get());
        });

        router.post('/test', (req, res) => {
            res.json(TestController.Post(req.body));
        });

        this.express.use('/api', router);
    }
}