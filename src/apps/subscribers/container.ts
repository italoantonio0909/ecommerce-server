import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { Subscribers } from './application/Subscribers'
import { SubscriberAdapter } from './insfraestructure/adapter/SubscriberAdapter'
import { SubscriberWebApiClient } from './insfraestructure/firebase/SubscriberWebApiClient'
import { SubscriberWebApiClientUserInterface } from './insfraestructure/api/SubscriberWebApi'

export const container = new Container()
container.bind(TYPES.Subscribers).to(Subscribers)
container.bind(TYPES.SubscriberAdapter).to(SubscriberAdapter)
container.bind(TYPES.SubscriberApiClient).to(SubscriberWebApiClient)
container
  .bind(TYPES.SubscriberUserInterface)
  .to(SubscriberWebApiClientUserInterface)
container.get<SubscriberAdapter>(TYPES.SubscriberAdapter).init();