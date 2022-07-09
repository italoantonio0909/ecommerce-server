import { injectable, inject } from 'inversify';
import TYPES from '../../../../container.types';
import { PartnerRepository, PartnerPaginate, StockRecordPaginate } from '../domain/PartnerRepository';
import { Partner, StockRecord } from '../domain/Partner';

@injectable()
export class Partners {
    constructor(
        @inject(TYPES.PartnerApiClient) private readonly partnerRepository: PartnerRepository
    ) { }

    async partnerCreate(partner: Partner): Promise<Partner> {
        const data: Partner = {
            ...partner,
            created_at: new Date().getTime()
        }
        return await this.partnerRepository.partnerCreate(partner)
    }

    async partnerPaginate(limit: number, startAfter: number): Promise<PartnerPaginate> {
        return await this.partnerPaginate(limit, startAfter)
    }

    async stockRecordCreate(stockRecord: StockRecord): Promise<StockRecord> {
        return await this.partnerRepository.stockRecordCreate(stockRecord)
    }

    async stockRecordPaginate(limit: number, startAfter: number): Promise<StockRecordPaginate> {
        return await this.partnerRepository.stockRecordPaginate(limit, startAfter)
    }

    async stockRecordUpdate(uid: string, stockRecord: Partial<StockRecord>): Promise<StockRecord> {
        return await this.partnerRepository.stockRecordUpdate(uid, stockRecord)
    }
}