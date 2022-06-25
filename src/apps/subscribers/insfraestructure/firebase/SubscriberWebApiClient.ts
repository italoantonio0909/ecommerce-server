import { injectable } from 'inversify'
import { Subscriber } from '../../domain/Subscriber'
import { SubscribersRepository } from '../../domain/SubscribersRepository'
import { applicationDefault } from 'firebase-admin/app'
import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()
@injectable()
export class SubscriberWebApiClient implements SubscribersRepository {
  firestore: admin.firestore.Firestore

  constructor() {
    // const admin = require('firebase-admin')

    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
  }

  async getSubscribers(): Promise<Array<Subscriber>> {
    const subscribersData = await this.firestore.collection('subscribers').get()
    return subscribersData.docs.map((e: any) => ({
      id: e.id,
      ...e.data(),
    }))
  }

  async createSubscriber(subscriber: Subscriber): Promise<Subscriber> {
    const { writeTime } = await this.firestore
      .collection('subscribers')
      .doc(subscriber.email)
      .set(subscriber)
    if (writeTime) {
      return subscriber
    }
  }

  async deleteSubscriber(email: string): Promise<any> {
    return await this.firestore
      .collection('subscribers')
      .doc(email)
      .update({ status: 'inactive' })
  }
}
