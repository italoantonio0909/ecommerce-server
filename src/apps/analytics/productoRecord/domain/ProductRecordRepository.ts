import { ProductRepository } from '../../../catalogue/product/domain/ProductRepository';
import { ProductRecord, ProductRecordPaginate } from './ProductRecord';

export interface ProductRecordRepository {
    productRecordCreate(productRecord: ProductRepository): Promise<ProductRecordPaginate>;

    productRecordPaginate(limit: number, startAfter: number): Promise<ProductRecord>;
}