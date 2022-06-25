import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { SubscriberUseCases } from './application/SubscriberUseCases'
import { SubscriberAdapter } from './insfraestructure/adapter/SubscriberAdapter'
import { SubscriberWebApiClient } from './insfraestructure/firebase/SubscriberWebApiClient'
import { SubscriberWebApiClientUserInterface } from './insfraestructure/api/SubscriberWebApi'

export const container = new Container()
container.bind(TYPES.Subscribers).to(SubscriberUseCases)
container.bind(TYPES.SubscriberAdapter).to(SubscriberAdapter)
container.bind(TYPES.SubscriberApiClient).to(SubscriberWebApiClient)
container
  .bind(TYPES.SubscriberUserInterface)
  .to(SubscriberWebApiClientUserInterface)
