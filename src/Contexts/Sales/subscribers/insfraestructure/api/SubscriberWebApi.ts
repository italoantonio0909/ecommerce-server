import { injectable } from 'inversify'
import express, { NextFunction, Request, Response } from 'express'
import { Subscriber } from '../../domain/Subscriber';
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

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
}
