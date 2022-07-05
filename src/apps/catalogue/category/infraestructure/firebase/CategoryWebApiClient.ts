import admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'
import { Category } from '../../../category/domain/Category'
import { injectable } from 'inversify'
import dotenv from 'dotenv'
import { CategoryRepository } from '../../domain/CategoryRepository';
import { CategoryPaginate } from '../../domain/Category';

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

  async categoryPaginate(limit: number, startAfter: number): Promise<CategoryPaginate> {

    const snapshot = startAfter === 0 ? await this.categorySimpleQuery(limit) : await this.categoryPaginateQuery(limit, startAfter);

    const last = snapshot[snapshot.length - 1]

    return { categories: snapshot, startAfter: last ? last.created_at : 0 }
  }

  async categoryCreate(category: Category) {
    const ref = this.firestore.collection('category').doc()

    const { writeTime } = await ref.set(category)

    if (writeTime) {
      return category
    }
  }

  async categorySearch(name: string): Promise<Category> {
    const ref = this.firestore.collection('category').where("name", "==", name)

    const snapshot = await ref.get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as Category
  }
}
