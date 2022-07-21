import { injectable, multiInject } from 'inversify'
import { NextFunction, Request, Response } from 'express'
import { Subscriber } from '../../domain/Subscriber';
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import { Router } from 'express';

@injectable()
export class SubscriberWebApiClientUserInterface implements SubscribersUserInterface {

  constructor() { }

  installSubscriberCreate(
    callback: (subscriber: Subscriber) => Promise<Subscriber>
  ): void {
    // this.router.post(
    //   '/api/subscribers',
    //   async function (req: Request, resp: Response, next: NextFunction) {
    //     try {
    //       const subscriber = req.body as Subscriber
    //       const subscriberCreated = await callback(subscriber)
    //       return resp.status(201).send(subscriberCreated)
    //     } catch (error) {
    //       next(error)
    //     }
    //   }
    // )
  }
}
