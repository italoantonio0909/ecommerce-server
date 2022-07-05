import { Customer, CustomerPaginated } from '../../domain/Customer';

export interface CustomerUserInterface {
  installCustomerPaginate(callback: (maxResults: number, pageToken: string) => Promise<CustomerPaginated>): void

  installCustomerCreate(callback: (customer: Customer) => Promise<Customer>): void

  installCustomerDelete(callback: (uid: string) => Promise<Customer>): void

  installCustomerByUid(callback: (uid: string) => Promise<Customer>): void
}
