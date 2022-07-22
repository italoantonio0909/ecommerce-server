import { inject, injectable } from "inversify";
import { Subscriber } from '../../domain/Subscriber';
import { Response, Request, NextFunction } from 'express';
import TYPES from '../../../../../../container.types';
import { SubscriberCreate } from '../../application/create/SubscriberCreate';

interface Controller {
    run(req: Request, res: Response, next: NextFunction): void
}

@injectable()
export class SubscriberCreateController implements Controller {

    constructor(
        @inject(TYPES.SubscriberCreate) private readonly subscriberCreate: SubscriberCreate
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        try {
            const subscriber = req.body as Subscriber
            const result = await this.subscriberCreate.create(subscriber)
            return res.status(201).send(result)
        } catch (error) {
            next(error)
        }
    }
}