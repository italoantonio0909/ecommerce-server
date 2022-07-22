import { Router } from 'express';
import { Response, Request, NextFunction } from 'express';
import { container } from '../../../../../apps/backend/dependency-injection/sales/Subscribers';
import TYPES from '../../../../../../container.types';
import { Subscriber } from '../../domain/Subscriber';
import { SubscriberAdapter } from '../adapter/SubscriberAdapter';

export const register = (router: Router) => {

    const callback = container.get<SubscriberAdapter>(TYPES.SubscriberAdapter).installSubscriberCreate;

    router.post("/api/subscribers", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subscriber = req.body as Subscriber
            const subscriberCreated = callback(subscriber)
            return res.status(201).send(subscriberCreated)
        } catch (error) {
            next(error)
        }
    })
}