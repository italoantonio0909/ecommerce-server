import { Customer } from './Customer'

export interface CustomerRepository {
  customerList(
    maxResults: number,
    pageToken: string
  ): Promise<{ customers: Array<Customer>; pageToken: string }>

  customerByUid(uid: string): Promise<Customer>

  customerCreate(customer: Customer): Promise<Customer>

  customerDelete(uid: string): Promise<any>
}
