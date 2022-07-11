import { Customer } from "../../../customers/domain/Customer"

export type CustomerRecordPaginate = {
    limit: number,
    count: number,
    next: number,
    previous: number,
    results: Array<CustomerRecord>
}

export class CustomerRecord {
    customer: Customer;
    num_product_views: number;
    num_basket_additions: number;
    num_orders: number;
    num_order_lines: number;
    num_order_items: number;
    total_spent: number;
    date_last_order: number;
}