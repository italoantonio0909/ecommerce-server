import { Container } from 'inversify'
import TYPES from '../../../../container.types'
import { SubscriberAdapter } from './insfraestructure/adapter/SubscriberAdapter'
import { SubscriberWebApiClient } from './insfraestructure/firebase/SubscriberWebApiClient'
import { SubscriberWebApiClientUserInterface } from './insfraestructure/api/SubscriberWebApi'
import { SubscriberCreate } from './application/create/BackofficeSubscriberCreate';
import { SubscriberSearch } from './application/search/BackofficeSubscriberSearch';
import { SubscribersPaginate } from './application/paginate/BackofficeSubscriberPaginate';
import { SubscriberUpdate } from './application/update/BackofficeSubscriberUpdate';
import { SubscriberDelete } from './application/delete/BackofficeSubscribersDelete';
import { SubscriberTotal } from './application/total/BackofficeSubscribersTotal';

export const container = new Container()
container.bind(TYPES.SubscriberCreate).to(SubscriberCreate)
container.bind(TYPES.SubscriberSearch).to(SubscriberSearch)
container.bind(TYPES.SubscriberPaginate).to(SubscribersPaginate)
container.bind(TYPES.SubscriberUpdate).to(SubscriberUpdate)
container.bind(TYPES.SubscriberTotal).to(SubscriberTotal)
container.bind(TYPES.SubscriberDelete).to(SubscriberDelete)
container.bind(TYPES.SubscriberAdapter).to(SubscriberAdapter)
container.bind(TYPES.SubscriberApiClient).to(SubscriberWebApiClient).inSingletonScope()
container.bind(TYPES.SubscriberUserInterface).to(SubscriberWebApiClientUserInterface)
container.get<SubscriberAdapter>(TYPES.SubscriberAdapter).init();