import { Router } from 'express';
import { Response, Request, NextFunction } from 'express';

export const register = (router: Router) => {
    router.post("/api/subscribers", (req: Request, res: Response, next: NextFunction) => {

    })
}