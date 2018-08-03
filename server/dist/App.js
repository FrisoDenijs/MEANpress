"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map