import { Router } from 'express';
import { Response, Request, NextFunction } from 'express';
import { Subscriber } from '../../domain/Subscriber';
import { container } from '../../../../../apps/backend/dependency-injection/index';
import TYPES from '../../../../../../container.types';
import { SubscriberCreate } from '../../application/create/SubscriberCreate';

export const register = (router: Router) => {
    router.post("/api/subscribers",
        async (req: Request, res: Response, next: NextFunction) => {
            res.json({ ok: 12 })
        })
}