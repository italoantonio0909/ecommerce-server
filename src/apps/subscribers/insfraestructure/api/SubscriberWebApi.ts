import { injectable } from 'inversify'
import express, { Request, Response } from 'express'
import { Subscriber } from '../../domain/Subscriber'
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import bodyParser from 'body-parser'
import cors from 'cors'

@injectable()
export class SubscriberWebApiClientUserInterface
  implements SubscribersUserInterface
{
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(8000, () => {
      console.log(`Subscribers listening on port 8000`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
    this.api.use(cors({ origin: 'http://localhost:4200' }))
  }

  installSubscribersAll(
    callback: (limit: number) => Promise<Array<Subscriber>>
  ): void {
    this.api.get(
      '/api/subscribers',
      async function (req: Request, resp: Response) {
        const { limit } = req.params
        const subscribers = await callback(parseInt(limit))
        return resp.status(200).send(subscribers)
      }
    )
  }

  installSubscriberCreate(
    callback: (subscriber: Subscriber) => Promise<Subscriber>
  ): void {
    this.api.post(
      '/api/subscribers',
      async function (req: Request, resp: Response) {
        const subscriber = req.body as Subscriber
        const subscriberCreated = await callback(subscriber)
        return resp.status(201).send(subscriberCreated)
      }
    )
  }

  installSubscriberDelete(
    callback: (email: string) => Promise<Subscriber>
  ): void {
    this.api.delete(
      '/api/subscribers',
      async function (req: Request, resp: Response) {
        const email = req.body as string
        const subscriberDelete = await callback(email)
        return resp.status(201).send(subscriberDelete)
      }
    )
  }
}
