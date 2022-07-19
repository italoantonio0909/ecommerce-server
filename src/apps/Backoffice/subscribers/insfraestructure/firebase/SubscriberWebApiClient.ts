import { injectable } from 'inversify'
import { Subscriber } from '../../domain/BackofficeSubscriber';
import { SubscribersRepository } from '../../domain/BackofficeSubscribersRepository'
import { applicationDefault } from 'firebase-admin/app'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { Paginate } from '../../../../shared/pagination/domain/Paginate';

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

  async subscriberSimpleQuery(limit: number): Promise<Array<Subscriber>> {
    const ref = this.firestore.collection('subscribers').orderBy('created_at')

    const snapshot = await ref.limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Subscriber>

    return result
  }

  async subscriberPaginateQuery(limit: number, startAfter: number): Promise<Array<Subscriber>> {

    const ref = this.firestore.collection('subscribers').orderBy('created_at')

    const snapshot = await ref.startAfter(startAfter).limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Subscriber>

    return result
  }

  async subscribersPaginate(limitOfDocuments: number, page: number): Promise<Paginate<Subscriber>> {

    let dataX;

    const limit = page > 1 ? ((limitOfDocuments * page) - limitOfDocuments) : 0;

    const subscribersAll = await this.firestore.collection('subscribers').select("_id").orderBy('created_at').get();

    if (page > 1) {
      const ref = subscribersAll.docs[limit - 1].id

      const data = await this.firestore.collection('subscribers').doc(ref).get();

      dataX = await data.data() as Subscriber;
    }

    const snapshot = page > 1
      ? await this.subscriberPaginateQuery(limitOfDocuments, dataX?.created_at)
      : await this.subscriberSimpleQuery(limitOfDocuments)

    return {
      count: subscribersAll.size,
      results: snapshot
    }
  }

  async subscriberCreate(subscriber: Subscriber): Promise<Subscriber> {
    const ref = this.firestore.collection('subscribers').doc()

    const { writeTime } = await ref.set(subscriber)
    if (writeTime) {
      return subscriber
    }
  }

  async subscriberDelete(id: string): Promise<Subscriber> {
    const ref = this.firestore.collection('subscribers').doc(id)

    const { writeTime } = await ref.update({ status: 'inactive' })

    if (writeTime) {
      const snapshot = await ref.get()

      return snapshot.data() as Subscriber
    }
  }

  async subscriberSearch(email: string): Promise<Subscriber> {
    const ref = this.firestore.collection('subscribers').where('email', '==', email.trim());

    const snapshot = await ref.get()
    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as Subscriber
  }

  async subscriberUpdate(uid: string, subscriber: Partial<Subscriber>): Promise<Subscriber> {
    const ref = this.firestore.collection('subscribers').doc(uid);

    const { writeTime } = await ref.update(subscriber)

    if (!writeTime) {
      return null;
    }

    const snapshot = await ref.get()

    return snapshot.data() as Subscriber
  }

  async subscribersTotal(): Promise<{ subscribersTotal: number }> {
    const ref = this.firestore.collection('subscribers').select("_id")

    const snapshot = await ref.get();

    return {
      subscribersTotal: snapshot.size
    }
  }
}
