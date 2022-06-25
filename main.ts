import 'reflect-metadata'
import { container } from './src/apps/subscribers/container'
import { SubscriberAdapter } from './src/apps/subscribers/insfraestructure/adapter/SubscriberAdapter'
import TYPES from './container.types'

container.get<SubscriberAdapter>(TYPES.SubscriberAdapter).init()
