import { Customers } from '../../customers/application/Customers';
import { Product } from '../../catalogue/product/domain/Product';

export class Partner {
    readonly code: string;
    readonly name: string;
    readonly users: Array<Customers>;
    readonly modified_at: number;
    readonly created_at: number;
}

export class StockRecord {
    readonly product: Product;
    readonly partner: Partner;
    readonly price_currency: number;
    readonly price: number;
    readonly num_in_stock: number;
    readonly num_allocated: number;
    readonly low_stock_threshold: number;
    readonly modified_at: number;
    readonly created_at: number;
}


