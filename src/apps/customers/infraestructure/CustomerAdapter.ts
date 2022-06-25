import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { CustomerUseCases } from '../application/CustomerUseCases'
import { CustomerUserInterface } from './CustomerUserInterface'

@injectable()
export class CustomerAdapter {
  constructor(
    @inject(TYPES.Customer) private customerUseCases: CustomerUseCases,
    @inject(TYPES.CustomerUserInterface)
    private customerUserInterface: CustomerUserInterface
  ) {}

  init() {
    this.customerUserInterface.installGetCustomers(() =>
      this.customerUseCases.getCustomers()
    )
  }
}
