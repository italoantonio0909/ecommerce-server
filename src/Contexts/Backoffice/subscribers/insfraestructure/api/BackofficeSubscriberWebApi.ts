import { injectable } from 'inversify'
import express, { NextFunction, Request, Response } from 'express'
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { BackofficeSubscribersUserInterface } from '../ui/BackofficeSubscribersUserInterface';
import { Paginate } from '../../../../Shared/pagination/domain/Paginate';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(400).json({ error: err.message })
}

@injectable()
export class SubscriberWebApiClientUserInterface
  implements BackofficeSubscribersUserInterface {
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


  installBackofficeSubscribersPaginate(
    callback: (limit: number, page: number) => Promise<Paginate<BackofficeSubscriber>>
  ): void {
    this.api.get(
      '/api/backoffice/subscribers/:limitOfDocuments/:page',
      async function (req: Request, resp: Response) {
        const { limitOfDocuments, page } = req.params
        const result = await callback(parseInt(limitOfDocuments), parseInt(page))
        return resp.status(200).send(result)
      }
    )
  }

  installBackofficeSubscriberTotal(
    callback: () => Promise<{ subscribersTotal: number }>
  ): void {
    this.api.get(
      '/api/backoffice/subscribers/total',
      async function (req: Request, resp: Response) {
        const result = await callback();
        return resp.status(200).send(result)
      }
    )
  }

  installBackofficeSubscriberCreate(
    callback: (subscriber: BackofficeSubscriber) => Promise<BackofficeSubscriber>
  ): void {
    this.api.post(
      '/api/backoffice/subscribers',
      async function (req: Request, resp: Response, next: NextFunction) {
        try {
          const subscriber = req.body as BackofficeSubscriber
          const result = await callback(subscriber)
          return resp.status(201).send(result)
        } catch (error) {
          next(error)
        }
      }, errorHandler
    )
  }

  installBackofficeSubscriberDelete(
    callback: (id: string) => Promise<BackofficeSubscriber>
  ): void {
    this.api.delete(
      '/api/backoffice/subscribers/:id',
      async function (req: Request, resp: Response) {
        const { id } = req.params
        const result = await callback(id)
        return resp.status(201).send(result)
      }
    )
  }

  installBackofficeSubscriberUpdate(
    callback: (uid: string, subscriber: Partial<BackofficeSubscriber>) => Promise<BackofficeSubscriber>
  ) {
    this.api.put(
      '/api/backoffice/subscribers/:id',
      async function (req: Request, resp: Response) {
        const { id } = req.params
        const data = req.body as Partial<BackofficeSubscriber>
        const result = await callback(id, data)
        return resp.status(201).send(result)
      }
    )
  }
}