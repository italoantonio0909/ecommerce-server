import { injectable } from 'inversify'
import express, { NextFunction, Request, Response } from 'express'
import { Subscriber } from '../../domain/BackofficeSubscriber';
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { Paginate } from '../../../../shared/pagination/domain/Paginate';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(400).json({ error: err.message })
}

@injectable()
export class SubscriberWebApiClientUserInterface
  implements SubscribersUserInterface {
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(SubscriberWebApiClientUserInterface.PORT, () => {
      console.log(`🔥Subscribers listening on port ${SubscriberWebApiClientUserInterface.PORT}`)
    })
    this.api.use(morgan("dev"))
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
    this.api.use(cors({ origin: 'http://localhost:4200' }))
  }

  installSubscribersPaginate(
    callback: (limit: number, page: number) => Promise<Paginate<Subscriber>>
  ): void {
    this.api.get(
      '/api/subscribers/:limitOfDocuments/:page',
      async function (req: Request, resp: Response) {
        const { limitOfDocuments, page } = req.params
        const subscribers = await callback(parseInt(limitOfDocuments), parseInt(page))
        return resp.status(200).send(subscribers)
      }
    )
  }

  installSubscriberTotal(
    callback: () => Promise<{ subscribersTotal: number }>
  ): void {
    this.api.get(
      '/api/subscribers/total',
      async function (req: Request, resp: Response) {
        const result = await callback();

        return resp.status(200).send(result)
      }
    )
  }

  installSubscriberCreate(
    callback: (subscriber: Subscriber) => Promise<Subscriber>
  ): void {
    this.api.post(
      '/api/subscribers',
      async function (req: Request, resp: Response, next: NextFunction) {
        try {
          const subscriber = req.body as Subscriber
          const subscriberCreated = await callback(subscriber)
          return resp.status(201).send(subscriberCreated)
        } catch (error) {
          next(error)
        }
      }, errorHandler
    )
  }

  installSubscriberDelete(
    callback: (id: string) => Promise<Subscriber>
  ): void {
    this.api.delete(
      '/api/subscribers/:id',
      async function (req: Request, resp: Response) {
        const { id } = req.params
        const subscriberDelete = await callback(id)
        return resp.status(201).send(subscriberDelete)
      }
    )
  }

  installSubscriberUpdate(
    callback: (uid: string, subscriber: Partial<Subscriber>) => Promise<Subscriber>
  ) {
    this.api.put(
      '/api/subscribers/:id',
      async function (req: Request, resp: Response) {
        const { id } = req.params
        const data = req.body as Partial<Subscriber>
        const subscriberDelete = await callback(id, data)
        return resp.status(201).send(subscriberDelete)
      }
    )
  }
}
