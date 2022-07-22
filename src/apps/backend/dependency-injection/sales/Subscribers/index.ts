import 'reflect-metadata'
import { Container } from 'inversify';
import TYPES from '../../../../../../container.types';
import { SubscriberCreate } from '../../../../../Contexts/Sales/subscribers/application/create/SubscriberCreate';
import { SubscriberSearch } from '../../../../../Contexts/Sales/subscribers/application/search/SubscriberSearch';
import { SubscriberWebApiClient } from '../../../../../Contexts/Sales/subscribers/insfrastructure/firebase/SubscriberWebApiClient';
import { SubscriberUserInterface } from '../../../../../Contexts/Sales/subscribers/insfrastructure/ui/SubscribersUserInterface';
import { SubscriberCreateController } from '../../../../../Contexts/Sales/subscribers/insfrastructure/controller/SubscriberCreateController';
// import { SubscriberCreateUserInterface, SubscriberCreateController } from '../../../../../Contexts/Sales/subscribers/insfrastructure/controller/SubscriberCreateController';

export const container = new Container();
container.bind(TYPES.SubscriberApiClient).to(SubscriberWebApiClient);
container.bind(TYPES.SubscriberCreate).to(SubscriberCreate).inRequestScope();
container.bind(TYPES.SubscriberSearch).to(SubscriberSearch);
// container.bind(TYPES.SubscriberAdapter).to(SubscriberAdapter);
container.bind(TYPES.SubscriberUserInterface).to(SubscriberCreateController);
// container.get<SubscriberAdapter>(TYPES.SubscriberAdapter).init()