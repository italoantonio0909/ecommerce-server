import { injectable } from 'inversify'
import { applicationDefault } from 'firebase-admin/app'
import dotenv from 'dotenv'
import { Customer } from '../domain/Customer'
import { CustomerRepository } from '../domain/CustomerRepository'

dotenv.config()

@injectable()
export class CustomerWebApiClient implements CustomerRepository {
  firestore

  constructor() {
    const admin = require('firebase-admin')

    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
  }

  async getCustomers(): Promise<Array<Customer>> {
    const customers = await this.firestore.collection('customers').get()
    return customers.docs.map((e: any) => ({
      id: e.id,
      ...e.data(),
    })) as Array<Customer>
  }

  // async createCustomer(customer: Customer): Promise<Customer> {
  //   const { writeTime } = await this.firestore
  //     .collection('subscribers')
  //     .doc(customer.email)
  //     .set(customer)
  //   if (writeTime) {
  //     return customer
  //   }
  //   return {} as Customer
  // }
}
