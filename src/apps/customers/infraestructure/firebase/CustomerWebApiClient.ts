import { injectable } from 'inversify'
import { applicationDefault } from 'firebase-admin/app'
import dotenv from 'dotenv'
import { Customer } from '../../domain/Customer'
import { CustomerRepository } from '../../domain/CustomerRepository'
import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

dotenv.config()

@injectable()
export class CustomerWebApiClient implements CustomerRepository {
  firestore: admin.firestore.Firestore
  auth: admin.auth.Auth

  constructor() {
    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
    this.auth = getAuth()
  }

  async customerList(
    maxResults: number,
    pageToken: string
  ): Promise<{ customers: Array<Customer>; pageToken: string }> {
    const { pageToken: pageTokenResult, users } = await this.auth.listUsers(
      maxResults,
      pageToken
    )
    const listCustomers = {
      customers: users.map(
        ({
          uid,
          disabled,
          emailVerified,
          phoneNumber,
          photoURL,
          displayName,
          email,
        }) => ({
          uid,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          displayName,
          disabled,
        })
      ),
      pageToken: pageTokenResult,
    }

    return listCustomers
  }

  async customerCreate(customer: Customer): Promise<Customer> {
    const {
      uid,
      email,
      emailVerified,
      disabled,
      phoneNumber,
      photoURL,
      displayName,
    } = await this.auth.createUser(customer)
    const customerCreated: Customer = {
      email,
      displayName,
      disabled,
      emailVerified,
      uid,
      phoneNumber,
      photoURL,
    }
    return customerCreated
  }

  async customerDelete(uid: string): Promise<any> {
    return await this.auth.updateUser(uid, { disabled: true })
  }

  async customerByUid(customerUid: string): Promise<Customer> {
    const {
      disabled,
      emailVerified,
      uid,
      photoURL,
      displayName,
      email,
      phoneNumber,
    } = await this.auth.getUser(customerUid)
    const customer: Customer = {
      email,
      displayName,
      disabled,
      emailVerified,
      uid,
      phoneNumber,
      photoURL,
    }

    return customer
  }
}
