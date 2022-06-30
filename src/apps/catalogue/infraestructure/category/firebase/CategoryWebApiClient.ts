import admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'
import { CategoryRepository } from '../../../domain/category/CategoryRepository'
import { Category } from '../../../domain/category/Category'
import { injectable } from 'inversify'
import dotenv from 'dotenv'

dotenv.config()
@injectable()
export class CategoryWebApiClient implements CategoryRepository {
  firestore: admin.firestore.Firestore

  constructor() {
    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
  }

  async categorySimpleQuery(limit: number): Promise<Array<Category>> {
    const first = this.firestore.collection('category').orderBy('created_at')

    const snapshot = await first.limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Category>

    return result
  }


  async categoryPaginateQuery(limit: number, startAfter: number): Promise<Array<Category>> {
    const first = this.firestore.collection('category').orderBy('created_at')

    const snapshot = await first.startAfter(startAfter).limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Category>

    return result
  }

  async categoryPaginate(limit: number, startAfter: number): Promise<{ categories: Array<Category>, startAfter: number }> {

    const snapshot = startAfter === 0 ? await this.categorySimpleQuery(limit) : await this.categoryPaginateQuery(limit, startAfter);

    const last = snapshot[snapshot.length - 1]

    return { categories: snapshot, startAfter: last.created_at }
  }

  async categoryCreate(category: Category) {
    const ref = this.firestore.collection('category').doc()

    const { writeTime } = await ref.set(category)

    if (writeTime) {
      return category
    }
  }
}
