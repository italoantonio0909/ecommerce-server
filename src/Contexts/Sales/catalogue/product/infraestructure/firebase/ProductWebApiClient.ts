import { ProductRepository } from '../../domain/ProductRepository';
import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { Product, ProductPaginate } from '../../domain/Product';

dotenv.config()
@injectable()
export class ProductWebApiClient implements ProductRepository {

    firestore: admin.firestore.Firestore

    constructor() {
        const firestore = admin.initializeApp({
            credential: applicationDefault(),
            databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
        })

        this.firestore = firestore.firestore()
    }

    async productCreate(product: Product): Promise<Product> {
        const ref = this.firestore.collection('product').doc()

        const { writeTime } = await ref.set(product)

        if (writeTime) {
            return product
        }
    }

    async productDetail(uid: string): Promise<Product> {
        const ref = this.firestore.collection('product').doc(uid)

        const product = await ref.get()

        return product.data() as Product
    }


    async productSimpleQuery(limit: number): Promise<Array<Product>> {
        const first = this.firestore.collection('product').orderBy('created_at')

        const snapshot = await first.limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<Product>

        return result
    }


    async productPaginateQuery(limit: number, startAfter: number): Promise<Array<Product>> {
        const first = this.firestore.collection('product').orderBy('created_at')

        const snapshot = await first.startAfter(startAfter).limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<Product>

        return result
    }

    async productQueryPrevious(first: number, limit: number): Promise<number> {

        const ref = this.firestore.collection('product').orderBy('created_at')

        const snapshot = await ref.endBefore(first).limit(limit).get();

        if (snapshot.empty) {
            return null;
        }

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<Product>

        return result[0].created_at
    }

    async productPaginate(limit: number, startAfter: number): Promise<ProductPaginate> {

        const products = await this.firestore.collection('product').select("_id").get();

        const snapshot = startAfter === 0 ? await this.productSimpleQuery(limit) : await this.productPaginateQuery(limit, startAfter);

        const last = snapshot ? snapshot[snapshot.length - 1].created_at : 0

        const first = snapshot[0].created_at;

        const previous = await this.productQueryPrevious(first, limit);

        return {
            count: products.size,
            limit: limit,
            next: last,
            previous: previous,
            results: snapshot
        }
    }

    async productUpdate(uid: string, product: Partial<Product>): Promise<Product> {
        const ref = this.firestore.collection('product').doc(uid)

        const snapshot = await ref.update(product)

        const productUpdate = await ref.get()

        return productUpdate.data() as Product
    }
}