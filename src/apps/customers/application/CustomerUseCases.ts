import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { Customer, CustomerPaginated } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository'

@injectable()
export class CustomerUseCases {
  constructor(
    @inject(TYPES.CustomerApiClient)
    private customerRepository: CustomerRepository
  ) { }

  async customersPaginate(maxResults: number, pageToken: string): Promise<CustomerPaginated> {
    return await this.customerRepository.customersPaginate(maxResults, pageToken)
  }

  async customerCreate(customer: Customer): Promise<Customer> {
    return await this.customerRepository.customerCreate({
      ...customer,
      disabled: false,
    })
  }

  async customerByUid(uid: string): Promise<Customer> {
    return await this.customerRepository.customerByUid(uid)
  }

  async customerDelete(uid: string): Promise<Customer> {
    return await this.customerRepository.customerDelete(uid)
  }
}
