import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { CustomerUseCases } from '../../application/CustomerUseCases'
import { CustomerUserInterface } from '../ui/CustomerUserInterface'
import { Customer } from '../../domain/Customer'

@injectable()
export class CustomerAdapter {
  constructor(
    @inject(TYPES.Customer) private customerUseCases: CustomerUseCases,
    @inject(TYPES.CustomerUserInterface)
    private customerUserInterface: CustomerUserInterface
  ) {}

  init() {
    this.customerUserInterface.installCustomerByUid((uid: string) =>
      this.customerUseCases.customerByUid(uid)
    )
    this.customerUserInterface.installCustomerCreate((customer: Customer) =>
      this.customerUseCases.customerCreate(customer)
    )
    this.customerUserInterface.installCustomerDelete((uid: string) =>
      this.customerUseCases.customerDelete(uid)
    )
    this.customerUserInterface.installCustomerList(
      (maxResults: number, pageToken: string) =>
        this.customerUseCases.customerList(maxResults, pageToken)
    )
  }
}
