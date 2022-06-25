import { Customer } from '../domain/Customer'

export interface CustomerUserInterface {
  installGetCustomers(callback: () => Promise<Array<Customer>>): void
}
