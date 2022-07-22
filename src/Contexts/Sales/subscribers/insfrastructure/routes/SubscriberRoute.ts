import { Router } from 'express';
import { Response, Request, NextFunction } from 'express';
import { container } from '../../../../../apps/backend/dependency-injection/sales/Subscribers';
import TYPES from '../../../../../../container.types';
import { SubscriberCreateController } from '../controller/SubscriberCreateController';

export const register = (router: Router) => {

    const callback = container.get<SubscriberCreateController>(TYPES.SubscriberUserInterface);

    router.post("/api/subscribers", async (req: Request, res: Response, next: NextFunction) => callback.run(req, res, next))
}