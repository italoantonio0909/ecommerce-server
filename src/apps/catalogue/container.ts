import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { CategoryAdapter } from './category/infraestructure/adapter/CategoryAdapter'
import { Categories } from './category/application/Categories';
import { CategoryWebApiClient } from './category/infraestructure/firebase/CategoryWebApiClient';
import { CategoryApiClient } from './category/infraestructure/api/CategoryApiClient';
import { Productdapter } from './product/infraestructure/adapter/ProductAdapter';
import { Products } from './product/application/Products';
import { ProductWebApiUserInterface } from './product/infraestructure/api/ProductWeApiUserInterface';
import { ProductWebApiClient } from './product/infraestructure/firebase/ProductWebApiClient';
import { ProductClasses } from './product-class/application/ProductClasses';
import { ProductClassWebApiUserInterface } from './product-class/infraestructure/api/ProductClassWebApiClientUserInterface';
import { ProductClassWebApiClient } from './product-class/infraestructure/firebase/ProductClassWebApiClient';
import { ProductClassAdapter } from './product-class/infraestructure/adapter/ProductClassAdapter';

export const container = new Container()

container.bind(TYPES.CatalogueCategory).to(Categories)
container.bind(TYPES.CatalogueCategoryAdapter).to(CategoryAdapter)
container.bind(TYPES.CatalogueCategoryApiClient).to(CategoryWebApiClient)
container.bind(TYPES.CatalogueCategoryUserInterface).to(CategoryApiClient)

container.bind(TYPES.CatalogueProduct).to(Products)
container.bind(TYPES.CatalogueProductUserInterface).to(ProductWebApiUserInterface)
container.bind(TYPES.CatalogueProductApiClient).to(ProductWebApiClient)
container.bind(TYPES.CatalogueProductAdapter).to(Productdapter)

container.bind(TYPES.CatalogueProductClass).to(ProductClasses)
container.bind(TYPES.CatalogueProductClassUserInterface).to(ProductClassWebApiUserInterface)
container.bind(TYPES.CatalogueProductClassApiClient).to(ProductClassWebApiClient)
container.bind(TYPES.CatalogueProductClassAdapter).to(ProductClassAdapter)

container.get<ProductClassAdapter>(TYPES.CatalogueProductClassAdapter).init();

// container.get<Productdapter>(TYPES.CatalogueProductAdapter).init();

// container.get<CategoryAdapter>(TYPES.CatalogueCategoryAdapter).init()