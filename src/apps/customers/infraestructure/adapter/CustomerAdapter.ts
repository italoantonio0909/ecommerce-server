import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { CustomerCreate } from '../../application/create/CustomerCreate';
import { CustomerUserInterface } from '../ui/CustomerUserInterface'
import { Customer } from '../../domain/Customer'
import { CustomerDelete } from '../../application/delete/CustomerDelete';
import { CustomerFind } from '../../application/find/CustomerFind';
import { CustomerPaginate } from '../../application/paginate/CustomerPaginate';

@injectable()
export class CustomerAdapter {
  constructor(
    @inject(TYPES.CustomerCreate) private customerCreate: CustomerCreate,
    @inject(TYPES.CustomerDelete) private customerDelete: CustomerDelete,
    @inject(TYPES.CustomerFind) private customerfind: CustomerFind,
    @inject(TYPES.CustomerPaginate) private customerPaginate: CustomerPaginate,
    @inject(TYPES.CustomerUserInterface)
    private customerUserInterface: CustomerUserInterface
  ) { }

  init() {
    this.customerUserInterface.installCustomerByUid((uid: string) =>
      this.customerfind.find(uid)
    )
    this.customerUserInterface.installCustomerCreate((customer: Customer) =>
      this.customerCreate.create(customer)
    )
    this.customerUserInterface.installCustomerDelete((uid: string) =>
      this.customerDelete.delete(uid)
    )
    this.customerUserInterface.installCustomerPaginate(
      (maxResults: number, pageToken: string) =>
        this.customerPaginate.paginate(maxResults, pageToken)
    )
  }
}
