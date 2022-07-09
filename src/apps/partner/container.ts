import { Container } from "inversify";
import TYPES from '../../../container.types';
import { PartnerWebApiClient } from './insfraestructure/firebase/PartnerWebApiClient';
import { PartnerAdapter } from './insfraestructure/adapter/PartnerAdapter';
import { PartnerWebApiClientUserInterface } from './insfraestructure/api/PartnerWebApiClientUserInterface';
import { Partners } from './application/Partners';

export const container = new Container();
container.bind(TYPES.Partner).to(Partners)
container.bind(TYPES.PartnerAdapter).to(PartnerAdapter)
container.bind(TYPES.PartnerUserInterface).to(PartnerWebApiClientUserInterface)
container.bind(TYPES.PartnerApiClient).to(PartnerWebApiClient)
container.get<PartnerAdapter>(TYPES.PartnerAdapter).init()