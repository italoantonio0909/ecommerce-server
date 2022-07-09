import { injectable } from 'inversify'
import { applicationDefault } from 'firebase-admin/app'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { PartnerRepository, PartnerPaginate, StockRecordPaginate } from '../../domain/PartnerRepository';
import { Partner, StockRecord } from '../../domain/Partner';

dotenv.config()
@injectable()
export class PartnerWebApiClient implements PartnerRepository {

    firestore: admin.firestore.Firestore

    constructor() {
        const firestore = admin.initializeApp({
            credential: applicationDefault(),
            databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
        })

        this.firestore = firestore.firestore()
    }

    async partnerSimpleQuery(limit: number): Promise<Array<Partner>> {
        const ref = this.firestore.collection('partner').orderBy('created_at')

        const snapshot = await ref.limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<Partner>

        return result
    }

    async partnerPaginateQuery(limit: number, startAfter: number): Promise<Array<Partner>> {
        const ref = this.firestore.collection('partner').orderBy('created_at')

        const snapshot = await ref.startAfter(startAfter).limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<Partner>

        return result
    }

    async partnerQueryPrevious(first: number, limit: number): Promise<number> {

        const ref = this.firestore.collection('partner').orderBy('created_at')

        const snapshot = await ref.endBefore(first).limit(limit).get();

        if (snapshot.empty) {
            return null;
        }

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<Partner>

        return result[0].created_at
    }

    async parnertPaginate(limit: number, startAfter: number): Promise<PartnerPaginate> {

        const partners = await this.firestore.collection('partner').select("_id").get();

        const snapshot = startAfter === 0 ? await this.partnerSimpleQuery(limit) : await this.partnerPaginateQuery(limit, startAfter);

        const last = snapshot ? snapshot[snapshot.length - 1].created_at : 0

        const first = snapshot[0].created_at;

        const previous = await this.partnerQueryPrevious(first, limit);

        return {
            count: partners.size,
            limit: limit,
            next: last,
            previous: previous,
            results: snapshot
        }
    }

    async partnerCreate(partner: Partner): Promise<Partner> {
        const ref = this.firestore.collection('partner').doc()

        const { writeTime } = await ref.set(partner)
        if (writeTime) {
            return partner
        }
    }

    async stockRecordSimpleQuery(limit: number): Promise<Array<StockRecord>> {
        const ref = this.firestore.collection('stockRecord').orderBy('created_at')

        const snapshot = await ref.limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<StockRecord>

        return result
    }

    async stockRecordPaginateQuery(limit: number, startAfter: number): Promise<Array<StockRecord>> {
        const ref = this.firestore.collection('stockRecord').orderBy('created_at')

        const snapshot = await ref.startAfter(startAfter).limit(limit).get()

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<StockRecord>

        return result
    }

    async stockRecordQueryPrevious(first: number, limit: number): Promise<number> {

        const ref = this.firestore.collection('stockRecord').orderBy('created_at')

        const snapshot = await ref.endBefore(first).limit(limit).get();

        if (snapshot.empty) {
            return null;
        }

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<StockRecord>

        return result[0].created_at
    }

    async stockRecordPaginate(limit: number, startAfter: number): Promise<StockRecordPaginate> {

        const stockRecord = await this.firestore.collection('stockRecord').select("_id").get();

        const snapshot = startAfter === 0 ? await this.stockRecordSimpleQuery(limit) : await this.stockRecordPaginateQuery(limit, startAfter);

        const last = snapshot ? snapshot[snapshot.length - 1].created_at : 0

        const first = snapshot[0].created_at;

        const previous = await this.partnerQueryPrevious(first, limit);

        return {
            count: stockRecord.size,
            limit: limit,
            next: last,
            previous: previous,
            results: snapshot
        }
    }


    async stockRecordUpdate(uid: string, stockRecord: StockRecord): Promise<StockRecord> {
        const ref = this.firestore.collection('stockRecord').doc(uid)

        const { writeTime } = await ref.update(stockRecord)
        if (writeTime) {
            return stockRecord
        }
    }


    async stockRecordCreate(stockRecord: StockRecord): Promise<StockRecord> {
        const ref = this.firestore.collection('stockRecord').doc()

        const { writeTime } = await ref.set(stockRecord)
        if (writeTime) {
            return stockRecord
        }
    }

}
