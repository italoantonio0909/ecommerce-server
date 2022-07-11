import { CustomerRecord, CustomerRecordPaginate } from './CustomerRecord';

export interface CustomerRecordRepository {
    customerRecordCreate(customerRecord: CustomerRecord): Promise<CustomerRecord>;

    customerRecordPaginate(limit: number, startAfter: number): Promise<CustomerRecordPaginate>;
}