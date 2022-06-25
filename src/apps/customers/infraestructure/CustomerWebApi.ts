import { injectable } from 'inversify'
import express from 'express'
import { CustomerUserInterface } from './CustomerUserInterface'
import { Customer } from '../domain/Customer'

@injectable()
export class CustomerWebApiClientUserInterface
  implements CustomerUserInterface
{
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(8000, () => {
      console.log(`web api listening on port 8000`)
    })
  }

  installGetCustomers(callback: () => Promise<Array<Customer>>): void {
    this.api.get('/api/customers', async function (request, response) {
      const subscribers = await callback()
      return response.send(subscribers)
    })
  }

  // installCreateCustomer(
  //   callback: (customer: Customer) => Promise<Customer>
  // ): void {
  //   this.api.post('/api/subscribers', async function (request, response) {
  //     const customer = request.body as Customer
  //     const customerResponse = await callback(customer)
  //     return response.send({ customer: customerResponse })
  //   })
  // }
}
