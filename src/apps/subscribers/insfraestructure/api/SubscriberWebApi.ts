import { injectable } from 'inversify'
import express, { NextFunction, Request, Response } from 'express'
import { Subscriber, SubscriberPaginate } from '../../domain/Subscriber';
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import bodyParser from 'body-parser'
import cors from 'cors'

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
      console.log(`🔥 Subscribers listening on port ${SubscriberWebApiClientUserInterface.PORT}`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
    this.api.use(cors({ origin: 'http://localhost:4200' }))
  }

  installSubscribersPaginate(
    callback: (limit: number, startAfter: number) => Promise<SubscriberPaginate>
  ): void {
    this.api.get(
      '/api/subscribers/:limit/:next',
      async function (req: Request, resp: Response) {
        const { limit, next } = req.params
        const subscribers = await callback(parseInt(limit), parseInt(next))
        return resp.status(200).send(subscribers)
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
