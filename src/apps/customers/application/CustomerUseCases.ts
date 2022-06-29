import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { Customer } from '../domain/Customer'
import { CustomerRepository } from '../domain/CustomerRepository'

@injectable()
export class CustomerUseCases {
  constructor(
    @inject(TYPES.CustomerApiClient)
    private customerRepository: CustomerRepository
  ) {}

  async customerList(
    maxResults: number,
    pageToken: string
  ): Promise<{ customers: Array<Customer>; pageToken: string }> {
    return await this.customerRepository.customerList(maxResults, pageToken)
  }

  async customerCreate(customer: Customer): Promise<Customer> {
    return await this.customerRepository.customerCreate({
      ...customer,
      disabled: false,
    })
  }

  async customerByUid(uid: string): Promise<any> {
    return await this.customerRepository.customerByUid(uid)
  }

  async customerDelete(uid: string): Promise<any> {
    return await this.customerRepository.customerDelete(uid)
  }
}
