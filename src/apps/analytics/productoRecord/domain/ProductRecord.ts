import { Product } from '../../../catalogue/product/domain/Product';

export type ProductRecordPaginate = {
    limit: number,
    count: number,
    next: number,
    previous: number,
    results: Array<ProductRecord>
}

export class ProductRecord {
    product: Product;
    num_views: number;
    num_basket_additions: number;
    num_purchases: number;
    score: number;
}