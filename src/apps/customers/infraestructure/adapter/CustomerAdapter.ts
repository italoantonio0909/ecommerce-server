import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { Customers } from '../../application/Customers'
import { CustomerUserInterface } from '../ui/CustomerUserInterface'
import { Customer } from '../../domain/Customer'

@injectable()
export class CustomerAdapter {
  constructor(
    @inject(TYPES.Customer) private customers: Customers,
    @inject(TYPES.CustomerUserInterface)
    private customerUserInterface: CustomerUserInterface
  ) { }

  init() {
    this.customerUserInterface.installCustomerByUid((uid: string) =>
      this.customers.customerByUid(uid)
    )
    this.customerUserInterface.installCustomerCreate((customer: Customer) =>
      this.customers.customerCreate(customer)
    )
    this.customerUserInterface.installCustomerDelete((uid: string) =>
      this.customers.customerDelete(uid)
    )
    this.customerUserInterface.installCustomerPaginate(
      (maxResults: number, pageToken: string) =>
        this.customers.customersPaginate(maxResults, pageToken)
    )
  }
}
