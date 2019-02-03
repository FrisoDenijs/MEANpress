import { Router } from 'express-serve-static-core';
import { TestController } from '../controllers';

const testRoute = '/test';

export function mountTestRoutes(router: Router) {
    router.get(testRoute, (req, res) => {
        res.json(TestController.Get());
    });

    router.post(testRoute, (req, res) => {
        res.json(TestController.Post(req.body));
    });
}