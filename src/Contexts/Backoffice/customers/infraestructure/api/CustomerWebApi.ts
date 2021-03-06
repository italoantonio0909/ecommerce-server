import { injectable } from 'inversify'
import express, { NextFunction, Request, Response } from 'express'
import { CustomerUserInterface } from '../ui/CustomerUserInterface'
import { Customer, CustomerPaginated } from '../../domain/Customer';
import bodyParser from 'body-parser'
import cors from 'cors'

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(400).json({ error: err.message })
}

@injectable()
export class CustomerWebApiClientUserInterface
  implements CustomerUserInterface {
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(CustomerWebApiClientUserInterface.PORT, () => {
      console.log(`Customers listening on port ${CustomerWebApiClientUserInterface.PORT}`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
    this.api.use(cors({ origin: 'http://localhost:4200' }))
  }

  installCustomerPaginate(
    callback: (
      maxResults: number,
      pageToken: string
    ) => Promise<CustomerPaginated>
  ): void {
    this.api.get(
      '/api/customers/list/:maxResults/:pageToken',
      async function (req: Request, res: Response) {
        const { maxResults, pageToken: pageTokenParam } = req.params
        const { customers, pageToken } = await callback(
          Number(maxResults),
          pageTokenParam
        )
        return res.status(201).json({ customers, pageToken })
      }
    )
  }

  installCustomerCreate(
    callback: (customer: Customer) => Promise<Customer>
  ): void {
    this.api.post(
      '/api/customers',
      async function (req: Request, res: Response, next: NextFunction) {
        try {
          const data = req.body as Customer
          const customer = await callback(data)
          return res.status(201).json({ customer })
        } catch (error) {
          next(error)
        }
      }, errorHandler
    )
  }

  installCustomerByUid(callback: (uid: string) => Promise<Customer>): void {
    this.api.get(
      '/api/customers/byUid:uid',
      async function (req: Request, res: Response) {
        const { uid } = req.params
        const customer = await callback(uid)
        return res.status(201).json({ customer })
      }
    )
  }

  installCustomerDelete(callback: (uid: string) => Promise<any>): void {
    this.api.get(
      '/api/customers/:uid',
      async function (req: Request, res: Response) {
        const { uid } = req.params
        await callback(uid)
        return res.status(201)
      }
    )
  }
}
