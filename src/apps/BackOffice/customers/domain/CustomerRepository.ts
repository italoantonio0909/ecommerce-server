import { Customer, CustomerPaginated } from './Customer';

export interface CustomerRepository {
  customersPaginate(maxResults: number, pageToken: string): Promise<CustomerPaginated>

  customerByUid(uid: string): Promise<Customer>

  customerCreate(customer: Customer): Promise<Customer>

  customerDelete(uid: string): Promise<Customer>
}
