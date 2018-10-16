import * as express from 'express';
import * as bodyParser from "body-parser";

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

        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            })
        });

        router.post('/login', (req, res) => {
            if (req.body.username === "username" &&
                req.body.password === "password") {
                res.json({
                    result: true
                });
            } else {
                res.json({result: false});
            }
        });

        this.express.use('/', router);
    }
}