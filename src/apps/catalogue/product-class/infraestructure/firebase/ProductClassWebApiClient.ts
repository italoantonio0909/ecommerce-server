import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { ProductClass, ProductClassPaginate } from '../../domain/ProductClass';
import { ProductClassRepository } from '../../domain/ProductClassRepository';

dotenv.config()
@injectable()
export class ProductClassWebApiClient implements ProductClassRepository {

    firestore: admin.firestore.Firestore

    constructor() {
        const firestore = admin.initializeApp({
            credential: applicationDefault(),
            databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
        })

        this.firestore = firestore.firestore()
    }

    async productClassCreate(productClass: ProductClass): Promise<ProductClass> {
        const ref = this.firestore.collection('product_class').doc()

        const { writeTime } = await ref.set(productClass)

        if (writeTime) {
            return productClass
        }
    }

    async productClassSimpleQuery(limit: number): Promise<Array<ProductClass>> {
        const first = this.firestore.collection('product_class').orderBy('created_at')

        const snapshot = await first.limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<ProductClass>

        return result
    }


    async productClassPaginateQuery(limit: number, startAfter: number): Promise<Array<ProductClass>> {
        const first = this.firestore.collection('product_class').orderBy('created_at')

        const snapshot = await first.startAfter(startAfter).limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<ProductClass>

        return result
    }

    async productClassQueryPrevious(first: number, limit: number): Promise<number> {

        const ref = this.firestore.collection('product_class').orderBy('created_at')

        const snapshot = await ref.endBefore(first).limit(limit).get();

        if (snapshot.empty) {
            return null;
        }

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<ProductClass>

        return result[0].created_at
    }

    async productClassPaginate(limit: number, startAfter: number): Promise<ProductClassPaginate> {

        const products = await this.firestore.collection('product_class').select("_id").get();

        const snapshot = startAfter === 0 ? await this.productClassSimpleQuery(limit) : await this.productClassPaginateQuery(limit, startAfter);

        const last = snapshot ? snapshot[snapshot.length - 1].created_at : 0

        const first = snapshot[0].created_at;

        const previous = await this.productClassQueryPrevious(first, limit);

        return {
            count: products.size,
            limit: limit,
            next: last,
            previous: previous,
            results: snapshot
        }
    }

    async productClassGet(limit: number): Promise<Array<ProductClass>> {
        const first = this.firestore.collection('product_class').orderBy('created_at')

        const snapshot = await first.limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<ProductClass>

        return result
    }

    async productClassUpdate(uid: string, productClass: Partial<ProductClass>): Promise<ProductClass> {
        const ref = this.firestore.collection('product_class').doc(uid)

        const { writeTime } = await ref.update(productClass)

        if (!writeTime) {
            return null
        }

        const productClassUpdate = await ref.get()

        return productClassUpdate.data() as ProductClass
    }
}