import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { CustomerPaginated } from '../../domain/Customer';
import { CustomerRepository } from '../../domain/CustomerRepository'

@injectable()
export class CustomerPaginate {
  constructor(
    @inject(TYPES.CustomerApiClient)
    private customerRepository: CustomerRepository
  ) { }

  async paginate(maxResults: number, pageToken: string): Promise<CustomerPaginated> {
    return await this.customerRepository.customersPaginate(maxResults, pageToken)
  }
}
