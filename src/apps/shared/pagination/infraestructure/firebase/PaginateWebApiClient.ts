import { Type as T } from 'typescript';
import { PaginateRepository } from '../../domain/PaginateRepository';
import admin from 'firebase-admin';


export class PaginateWebApiCient implements PaginateRepository {
    firestore: admin.firestore.Firestore
    collectionPath: string;

    constructor(firestore: admin.firestore.Firestore, collectionPath: string) {
        this.firestore = firestore;
        this.collectionPath = collectionPath;
    }

    async paginatePaginateQuery(limit: number, startAfter: number): Promise<Array<T>> {
        const ref = this.firestore.collection(this.collectionPath).orderBy('created_at')

        const snapshot = await ref.startAfter(startAfter).limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<T>

        return result
    }

    async paginatePreviuosQuery(first: number, limit: number): Promise<number> {

        const ref = this.firestore.collection(this.collectionPath).orderBy('created_at')

        const snapshot = await ref.endBefore(first).limit(limit).get();

        if (snapshot.empty) {
            return null;
        }

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<T>

        return 1
    }

    async paginateSimpleQuery(limit: number): Promise<Array<T>> {
        const ref = this.firestore.collection(this.collectionPath).orderBy('created_at')

        const snapshot = await ref.limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<T>

        return result
    }
}