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

    async productPaginate(limit: number, startAfter: number): Promise<ProductPaginate> {
        const snapshot = startAfter === 0 ? await this.productSimpleQuery(limit) : await this.productPaginateQuery(limit, startAfter);

        const last = snapshot[snapshot.length - 1]

        return { products: snapshot, startAfter: last ? last.created_at : 0 }
    }

    async productUpdate(uid: string, product: Product): Promise<Product> {
        const ref = this.firestore.collection('product').doc(uid)

        const snapshot = await ref.update(product)

        const productUpdate = await ref.get()

        return productUpdate.data() as Product
    }
}