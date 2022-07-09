import { injectable, inject } from 'inversify';
import TYPES from '../../../../../container.types';
import { Partners } from '../../application/Partners';
import { PartnerUserInterface } from '../ui/PartnerUserInterface';
import { Partner, StockRecord } from '../../domain/Partner';

@injectable()
export class PartnerAdapter {
    constructor(
        @inject(TYPES.Partner) private readonly partners: Partners,
        @inject(TYPES.PartnerUserInterface) private readonly partnerUserInterface: PartnerUserInterface
    ) { }

    init() {
        this.partnerUserInterface.installPartnerCreate((partner: Partner) => this.partners.partnerCreate(partner))
        this.partnerUserInterface.installPartnerPaginate((limit: number, startAfter: number) => this.partners.partnerPaginate(limit, startAfter))
        this.partnerUserInterface.installStockRecordCreate((stockRecord: StockRecord) => this.partners.stockRecordCreate(stockRecord))
        this.partnerUserInterface.installStockRecordPaginate((limit: number, startAfter: number) => this.partners.stockRecordPaginate(limit, startAfter))
        this.partnerUserInterface.installStockRecordUpdate((uid: string, stockRecord: StockRecord) => this.partners.stockRecordUpdate(uid, stockRecord))
    }
}