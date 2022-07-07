import { Container } from 'inversify';
import TYPES from '../../../../container.types';
import { Products } from './application/Products';
import { Productdapter } from './infraestructure/adapter/ProductAdapter';
import { ProductWebApiUserInterface } from './infraestructure/api/ProductWeApiUserInterface';
import { ProductWebApiClient } from './infraestructure/firebase/ProductWebApiClient';

export const container = new Container();
container.bind(TYPES.CatalogueProduct).to(Products)
container.bind(TYPES.CatalogueProductUserInterface).to(ProductWebApiUserInterface)
container.bind(TYPES.CatalogueProductApiClient).to(ProductWebApiClient)
container.bind(TYPES.CatalogueProductAdapter).to(Productdapter)
container.get<Productdapter>(TYPES.CatalogueProductAdapter).init();