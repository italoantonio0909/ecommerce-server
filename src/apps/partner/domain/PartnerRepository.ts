import { Partner, StockRecord } from './Partner';

export type PartnerPaginate = {
    limit: number,
    count: number,
    next: number,
    previous: number,
    results: Array<Partner>
}

export type StockRecordPaginate = {
    limit: number,
    count: number,
    next: number,
    previous: number,
    results: Array<StockRecord>
}

export interface PartnerRepository {
    parnertPaginate(limit: number, startAfter: number): Promise<PartnerPaginate>

    partnerCreate(partner: Partner): Promise<Partner>

    stockRecordPaginate(limit: number, startAfter: number): Promise<StockRecordPaginate>

    stockRecordCreate(stockRecord: StockRecord): Promise<StockRecord>;

    stockRecordUpdate(uid: string, stockRecord: Partial<StockRecord>): Promise<StockRecord>;
}