import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { Customer } from '../domain/Customer'
import { CustomerRepository } from '../domain/CustomerRepository'

@injectable()
export class CustomerUseCases {
  constructor(
    @inject(TYPES.CustomerRepository)
    private customerRepository: CustomerRepository
  ) {}

  async getCustomers(): Promise<Array<Customer>> {
    return await this.customerRepository.getCustomers()
  }
}
