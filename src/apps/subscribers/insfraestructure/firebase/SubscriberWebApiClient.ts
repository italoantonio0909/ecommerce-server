import { injectable } from 'inversify'
import { Subscriber, SubscriberPaginate } from '../../domain/Subscriber';
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

  async subscriberQueryPrevious(first: number, limit: number): Promise<number> {

    const ref = this.firestore.collection('subscribers').orderBy('created_at')

    const snapshot = await ref.endBefore(first).limit(limit).get();

    if (snapshot.empty) {
      return null;
    }

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Subscriber>

    return result[0].created_at
  }

  async subscribersPaginate(limit: number, startAfter: number): Promise<SubscriberPaginate> {

    const subscribers = await this.firestore.collection('subscribers').select("_id").get();

    const snapshot = startAfter === 0 ? await this.subscriberSimpleQuery(limit) : await this.subscriberPaginateQuery(limit, startAfter);

    const last = snapshot ? snapshot[snapshot.length - 1].created_at : 0

    const first = snapshot[0].created_at;

    const previous = await this.subscriberQueryPrevious(first, limit);

    return {
      count: subscribers.size,
      limit: limit,
      next: last,
      previous: previous,
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
}
