import { injectable } from 'inversify'
import { Subscriber } from '../../domain/Subscriber';
import { SubscribersRepository } from '../../domain/SubscribersRepository'
import { applicationDefault } from 'firebase-admin/app'
import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()
@injectable()
export class SubscriberWebApiClient implements SubscribersRepository {

  firestore: admin.firestore.Firestore

  constructor() {
    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
  }

  async subscriberCreate(subscriber: Subscriber): Promise<Subscriber> {
    const ref = this.firestore.collection('subscribers').doc()

    const { writeTime } = await ref.set(subscriber)
    if (writeTime) {
      return subscriber
    }
  }


}
