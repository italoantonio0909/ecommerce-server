import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { SubscriberAdapter } from './insfraestructure/adapter/SubscriberAdapter'
import { SubscriberWebApiClient } from './insfraestructure/firebase/SubscriberWebApiClient'
import { SubscriberWebApiClientUserInterface } from './insfraestructure/api/SubscriberWebApi'
import { SubscriberCreate } from './application/create/SubscriberCreate';
import { SubscriberSearch } from './application/search/SubscriberSearch';
import { SubscribersPaginate } from './application/paginate/SubscriberPaginate';
import { SubscriberUpdate } from './application/update/SubscriberUpdate';

export const container = new Container()
container.bind(TYPES.Subscribers).to(SubscriberCreate)
container.bind(TYPES.Subscribers).to(SubscriberSearch)
container.bind(TYPES.Subscribers).to(SubscribersPaginate)
container.bind(TYPES.Subscribers).to(SubscriberUpdate)
container.bind(TYPES.SubscriberAdapter).to(SubscriberAdapter)
container.bind(TYPES.SubscriberApiClient).to(SubscriberWebApiClient)
container
  .bind(TYPES.SubscriberUserInterface)
  .to(SubscriberWebApiClientUserInterface)
container.get<SubscriberAdapter>(TYPES.SubscriberAdapter).init();