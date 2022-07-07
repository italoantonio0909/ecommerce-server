import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { Customers } from './application/Customers'
import { CustomerAdapter } from './infraestructure/adapter/CustomerAdapter'
import { CustomerWebApiClientUserInterface } from './infraestructure/api/CustomerWebApi'
import { CustomerWebApiClient } from './infraestructure/firebase/CustomerWebApiClient'

export const container = new Container()
container.bind(TYPES.Customer).to(Customers)
container.bind(TYPES.CustomerAdapter).to(CustomerAdapter)
container
  .bind(TYPES.CustomerUserInterface)
  .to(CustomerWebApiClientUserInterface)
container.bind(TYPES.CustomerApiClient).to(CustomerWebApiClient)
container.get<CustomerAdapter>(TYPES.CustomerAdapter).init()