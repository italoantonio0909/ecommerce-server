import { Customer } from '../../domain/Customer'

export interface CustomerUserInterface {
  installCustomerList(
    callback: (
      maxResults: number,
      pageToken: string
    ) => Promise<{ customers: Array<Customer>; pageToken: string }>
  ): void
  installCustomerCreate(
    callback: (customer: Customer) => Promise<Customer>
  ): void
  installCustomerDelete(callback: (uid: string) => Promise<any>): void
  installCustomerByUid(callback: (uid: string) => Promise<Customer>): void
}
