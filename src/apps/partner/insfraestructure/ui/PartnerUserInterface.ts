import { Partner, StockRecord } from '../../domain/Partner';
import { PartnerPaginate, StockRecordPaginate } from '../../domain/PartnerRepository';


export interface PartnerUserInterface {
    installPartnerCreate(callback: (partner: Partner) => Promise<Partner>): void;

    installPartnerPaginate(callback: (limit: number, startAfter: number) => Promise<PartnerPaginate>): void;

    installStockRecordCreate(callback: (partner: StockRecord) => Promise<StockRecord>): void;

    installStockRecordPaginate(callback: (limit: number, startAfter: number) => Promise<StockRecordPaginate>): void;

    installStockRecordUpdate(callback: (uid: string, stockRecord: Partial<StockRecord>) => Promise<StockRecord>): void;
}