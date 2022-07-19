import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { Customer } from '../../domain/Customer';
import { CustomerRepository } from '../../domain/CustomerRepository'

@injectable()
export class CustomerCreate {
  constructor(
    @inject(TYPES.CustomerApiClient)
    private customerRepository: CustomerRepository
  ) { }

  async create(customer: Customer): Promise<Customer> {
    return await this.customerRepository.customerCreate({
      ...customer,
      disabled: false,
      displayName: customer.email,
      emailVerified: true,
    })
  }
}
