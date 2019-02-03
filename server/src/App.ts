import * as express from 'express';
import * as bodyParser from "body-parser";
import { mountTestRoutes } from './routes';
import { UserCredentialsSchema, UserCredentials } from './schemas/user-credentials.schema';

const env = process.env.ENVIRONMENT || 'debug';

//based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
export class App {
    public express;

    public constructor() {
        this.express = express();
        this.setupMongoose();
        this.preRoutes();
        this.mountRoutes();
    }

    private preRoutes() {
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));

        this.express.use(bodyParser.json());
    }

    private setupMongoose(): void {
        const mongoose = require('mongoose');
        let dev_db_url = 'mongodb://localhost:27017/TODOjs';
        const mongoDB = process.env.MONGODB_URI || dev_db_url;
        const mongoConfig = {
            useNewUrlParser: true,
            useFindAndModify: false
        };
        mongoose.connect(mongoDB, mongoConfig);
        mongoose.Promise = global.Promise;
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        const admin = new UserCredentials();
        admin.username = 'admin';
        admin.setPassword('admin');
        admin.save();

    }

    private mountRoutes(): void {
        const router = express.Router();

        if (env === 'debug' || env === 'test') {
            mountTestRoutes(router);
        }

        this.express.use('/api', router);
    }
}