import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IController } from './controller.interface';

import "reflect-metadata";

@injectable()
export class LoginController implements IController {
    get(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    put(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    public post(req: Request, res: Response) {
        if (req.body.username === "username" && req.body.password === "password") {
            res.json({
                result: true
            });
        } else {
            res.json({result: false});
        }
    }
}
