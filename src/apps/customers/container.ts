import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { CustomerCreate } from './application/create/CustomerCreate';
import { CustomerAdapter } from './infraestructure/adapter/CustomerAdapter'
import { CustomerWebApiClientUserInterface } from './infraestructure/api/CustomerWebApi'
import { CustomerWebApiClient } from './infraestructure/firebase/CustomerWebApiClient'
import { CustomerDelete } from './application/delete/CustomerDelete';
import { CustomerFind } from './application/find/CustomerFind';
import { CustomerPaginate } from './application/paginate/CustomerPaginate';

export const container = new Container()
container.bind(TYPES.CustomerCreate).to(CustomerCreate)
container.bind(TYPES.CustomerDelete).to(CustomerDelete)
container.bind(TYPES.CustomerFind).to(CustomerFind)
container.bind(TYPES.CustomerPaginate).to(CustomerPaginate)
container.bind(TYPES.CustomerAdapter).to(CustomerAdapter)
container.bind(TYPES.CustomerUserInterface).to(CustomerWebApiClientUserInterface)
container.bind(TYPES.CustomerApiClient).to(CustomerWebApiClient).inSingletonScope()
container.get<CustomerAdapter>(TYPES.CustomerAdapter).init()