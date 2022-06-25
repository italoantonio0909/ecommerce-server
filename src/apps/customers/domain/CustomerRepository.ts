import { Customer } from '../domain/Customer'

export interface CustomerRepository {
  getCustomers(): Promise<Array<Customer>>
}
