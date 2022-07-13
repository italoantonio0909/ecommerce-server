import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { Customer } from '../../domain/Customer';
import { CustomerRepository } from '../../domain/CustomerRepository'

@injectable()
export class CustomerFind {
  constructor(
    @inject(TYPES.CustomerApiClient)
    private customerRepository: CustomerRepository
  ) { }

  async find(uid: string): Promise<Customer> {
    return await this.customerRepository.customerByUid(uid)
  }
}
