import { Customer } from '../../customers/domain/Customer';

type BasketStatus = "Open" | "Merged" | "Saved" | "Frozen" | "Submitted"

export class Basket {
    owner: Customer;
    status: BasketStatus;
    date_created: number;
    date_merged: number;
    date_submitted: number;
}