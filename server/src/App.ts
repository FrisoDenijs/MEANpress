import * as express from 'express';
import * as bodyParser from "body-parser";
import { IController, ControllerTypes } from './controllers';
import { Container } from 'inversify';

//based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
export class App {
    public express;
    private _loginController: IController;

    public constructor(controllerContainer: Container) {
        this.express = express();
        this.mountRoutes();
        this._loginController = controllerContainer.get<IController>(ControllerTypes.LOGIN_CONTROLLER);
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
            this._loginController.post(req, res);
        });

        this.express.use('/', router);
    }
}