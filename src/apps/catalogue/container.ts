import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { CategoryUseCases } from './application/category/CategoryUseCases'
import { CategoryAdapter } from './infraestructure/category/adapter/CategoryAdapter'
import { CategoryApiClient } from './infraestructure/category/api/CategoryApiClient'
import { CategoryWebApiClient } from './infraestructure/category/firebase/CategoryWebApiClient'

export const container = new Container()
container.bind(TYPES.CatalogueCategory).to(CategoryUseCases)
container.bind(TYPES.CatalogueCategoryAdapter).to(CategoryAdapter)
container.bind(TYPES.CatalogueCategoryApiClient).to(CategoryWebApiClient)
container.bind(TYPES.CatalogueCategoryUserInterface).to(CategoryApiClient)
