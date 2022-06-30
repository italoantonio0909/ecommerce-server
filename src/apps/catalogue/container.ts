import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { CategoryAdapter } from './category/infraestructure/adapter/CategoryAdapter'
import { CategoryUseCases } from './category/application/CategoryUseCases';
import { CategoryWebApiClient } from './category/infraestructure/firebase/CategoryWebApiClient';
import { CategoryApiClient } from './category/infraestructure/api/CategoryApiClient';

export const container = new Container()
container.bind(TYPES.CatalogueCategory).to(CategoryUseCases)
container.bind(TYPES.CatalogueCategoryAdapter).to(CategoryAdapter)
container.bind(TYPES.CatalogueCategoryApiClient).to(CategoryWebApiClient)
container.bind(TYPES.CatalogueCategoryUserInterface).to(CategoryApiClient)
