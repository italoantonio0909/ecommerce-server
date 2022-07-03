import { Container } from 'inversify';
import TYPES from '../../../container.types';
import { BlogUseCases } from './application/BlogUseCases';
import { BlogAdapter } from './insfraestructure/adapter/BlogAdapter';
import { BlogWebApiClient } from './insfraestructure/firebase/BlogWebApiClient';
import { BlogWebApiClientUserInterface } from './insfraestructure/api/BlogWebApiUserInterface';

export const container = new Container()
container.bind(TYPES.Blog).to(BlogUseCases);
container.bind(TYPES.BlogAdapter).to(BlogAdapter);
container.bind(TYPES.BlogUserInterface).to(BlogWebApiClientUserInterface);
container.bind(TYPES.BlogWebApiClient).to(BlogWebApiClient);
