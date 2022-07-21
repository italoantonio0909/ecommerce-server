import { Container } from 'inversify';
import TYPES from '../../../../container.types';
import { SubscriberCreate } from '../../../Contexts/Sales/subscribers/application/create/SubscriberCreate';
import { SubscriberSearch } from '../../../Contexts/Sales/subscribers/application/search/SubscriberSearch';
import { SubscriberAdapter } from '../../../Contexts/Sales/subscribers/insfraestructure/adapter/SubscriberAdapter';
import { SubscriberWebApiClientUserInterface } from '../../../Contexts/Sales/subscribers/insfraestructure/api/SubscriberWebApiClientUserInterface.route';
import { SubscriberWebApiClient } from '../../../Contexts/Sales/subscribers/insfraestructure/firebase/SubscriberWebApiClient';

export const container = new Container();
container.bind(TYPES.SubscriberCreate).to(SubscriberCreate);
container.bind(TYPES.SubscriberSearch).to(SubscriberSearch);
container.bind(TYPES.SubscriberAdapter).to(SubscriberAdapter);
container.bind(TYPES.SubscriberApiClient).to(SubscriberWebApiClient).inSingletonScope();
container.bind(TYPES.SubscriberUserInterface).to(SubscriberWebApiClientUserInterface);