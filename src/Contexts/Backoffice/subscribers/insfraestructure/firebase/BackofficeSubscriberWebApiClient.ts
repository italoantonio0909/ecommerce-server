import { injectable } from 'inversify'
import { applicationDefault } from 'firebase-admin/app'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { Paginate } from '../../../../Shared/pagination/domain/Paginate';
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';
import { BackofficeSubscribersRepository } from '../../domain/BackofficeSubscribersRepository';
import { BackofficeSubscriberTotal } from '../../application/total/BackofficeSubscribersTotal';

dotenv.config()
@injectable()
export class SubscriberWebApiClient implements BackofficeSubscribersRepository {

  firestore: admin.firestore.Firestore

  constructor() {
    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
  }

  async simpleQuery(limit: number): Promise<Array<BackofficeSubscriber>> {
    const ref = this.firestore.collection('subscribers').orderBy('created_at')

    const snapshot = await ref.limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<BackofficeSubscriber>

    return result
  }

  async paginateQuery(limit: number, startAfter: number): Promise<Array<BackofficeSubscriber>> {

    const ref = this.firestore.collection('subscribers').orderBy('created_at')

    const snapshot = await ref.startAfter(startAfter).limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<BackofficeSubscriber>

    return result
  }

  async paginate(limitOfDocuments: number, page: number): Promise<Paginate<BackofficeSubscriber>> {

    let dataX;

    const limit = page > 1 ? ((limitOfDocuments * page) - limitOfDocuments) : 0;

    const subscribersAll = await this.firestore.collection('subscribers').select("_id").orderBy('created_at').get();

    if (page > 1) {
      const ref = subscribersAll.docs[limit - 1].id

      const data = await this.firestore.collection('subscribers').doc(ref).get();

      dataX = await data.data() as BackofficeSubscriber;
    }

    const snapshot = page > 1
      ? await this.paginateQuery(limitOfDocuments, dataX?.created_at)
      : await this.simpleQuery(limitOfDocuments)

    return {
      count: subscribersAll.size,
      results: snapshot
    }
  }

  async create(subscriber: BackofficeSubscriber): Promise<BackofficeSubscriber> {
    const ref = this.firestore.collection('subscribers').doc()

    const { writeTime } = await ref.set(subscriber)
    if (writeTime) {
      return subscriber
    }
  }

  async delete(id: string): Promise<BackofficeSubscriber> {
    const ref = this.firestore.collection('subscribers').doc(id)

    const { writeTime } = await ref.update({ status: 'inactive' })

    if (writeTime) {
      const snapshot = await ref.get()

      return snapshot.data() as BackofficeSubscriber
    }
  }

  async searchByEmail(email: string): Promise<BackofficeSubscriber> {
    const ref = this.firestore.collection('subscribers').where('email', '==', email.trim());

    const snapshot = await ref.get()
    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as BackofficeSubscriber
  }

  async update(uid: string, subscriber: Partial<BackofficeSubscriber>): Promise<BackofficeSubscriber> {
    const ref = this.firestore.collection('subscribers').doc(uid);

    const { writeTime } = await ref.update(subscriber)

    if (!writeTime) {
      return null;
    }

    const snapshot = await ref.get()

    return snapshot.data() as BackofficeSubscriber
  }

  async total(): Promise<{ subscribersTotal: number }> {
    const ref = this.firestore.collection('subscribers').select("_id")

    const snapshot = await ref.get();

    return {
      subscribersTotal: snapshot.size
    }
  }
}