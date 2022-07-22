import { injectable } from 'inversify'
import { applicationDefault } from 'firebase-admin/app'
import dotenv from 'dotenv'
import { Customer, CustomerPaginated } from '../../domain/Customer';
import { CustomerRepository } from '../../domain/CustomerRepository'
import admin from 'firebase-admin'
import { getAuth, UserRecord } from 'firebase-admin/auth';

dotenv.config()

@injectable()
export class CustomerWebApiClient implements CustomerRepository {
  auth: admin.auth.Auth

  constructor() {
    admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.auth = getAuth()
  }

  customerMapAttr(customer: UserRecord): Customer {
    const { uid, disabled, emailVerified, phoneNumber, photoURL, displayName, email } = customer;
    return { email, displayName, disabled, emailVerified, uid, phoneNumber, photoURL }
  }

  async customersPaginate(maxResults: number, pageToken: string): Promise<CustomerPaginated> {
    const { pageToken: pageTokenResult, users } = await this.auth.listUsers(maxResults, pageToken);

    const customers = users.map((e) => this.customerMapAttr(e))

    return { pageToken: pageTokenResult, customers }
  }

  async customerCreate(customer: Customer): Promise<Customer> {
    const customerCreated = await this.auth.createUser(customer)

    const customerMappedAtrr = this.customerMapAttr(customerCreated)

    return customerMappedAtrr
  }

  async customerDelete(uid: string): Promise<any> {
    return await this.auth.updateUser(uid, { disabled: true })
  }

  async customerByUid(customerUid: string): Promise<Customer> {
    const customer = await this.auth.getUser(customerUid)

    const customerMappedAttr = this.customerMapAttr(customer)

    return customerMappedAttr
  }
}
