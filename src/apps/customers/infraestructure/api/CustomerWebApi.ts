import { injectable } from 'inversify'
import express, { Request, Response } from 'express'
import { CustomerUserInterface } from '../ui/CustomerUserInterface'
import { Customer } from '../../domain/Customer'
import bodyParser from 'body-parser'
import cors from 'cors'

@injectable()
export class CustomerWebApiClientUserInterface
  implements CustomerUserInterface
{
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(8000, () => {
      console.log(`Customer listening on port 8000`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
    this.api.use(cors({ origin: 'http://localhost:4200' }))
  }

  installCustomerList(
    callback: (
      maxResults: number,
      pageToken: string
    ) => Promise<{ customers: Array<Customer>; pageToken: string }>
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
      async function (req: Request, res: Response) {
        const customer = req.body as Customer
        const customerCreated = await callback(customer)
        return res.status(201).json({ subscribers: customerCreated })
      }
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
