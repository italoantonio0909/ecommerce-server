import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { CategoryAdapter } from './category/infraestructure/adapter/CategoryAdapter'
import { Categories } from './category/application/Categories';
import { CategoryWebApiClient } from './category/infraestructure/firebase/CategoryWebApiClient';
import { CategoryApiClient } from './category/infraestructure/api/CategoryApiClient';
import { Productdapter } from './product/infraestructure/adapter/ProductAdapter';
import { ProductWebApiUserInterface } from './product/infraestructure/api/ProductWeApiUserInterface';
import { ProductWebApiClient } from './product/infraestructure/firebase/ProductWebApiClient';
import { ProductClasses } from './product-class/application/ProductClasses';
import { ProductClassWebApiUserInterface } from './product-class/infraestructure/api/ProductClassWebApiClientUserInterface';
import { ProductClassWebApiClient } from './product-class/infraestructure/firebase/ProductClassWebApiClient';
import { ProductClassAdapter } from './product-class/infraestructure/adapter/ProductClassAdapter';
import { ProductCreate } from './product/application/create/ProductCreate';
import { ProductDetail } from './product/application/detail/ProductDetail';
import { ProductsPaginate } from './product/application/paginate/ProductPaginate';
import { ProductUpdate } from './product/application/update/Products';

export const container = new Container()

container.bind(TYPES.CatalogueCategory).to(Categories)
container.bind(TYPES.CatalogueCategoryAdapter).to(CategoryAdapter)
container.bind(TYPES.CatalogueCategoryApiClient).to(CategoryWebApiClient)
container.bind(TYPES.CatalogueCategoryUserInterface).to(CategoryApiClient)

container.bind(TYPES.ProductCreate).to(ProductCreate)
container.bind(TYPES.ProductDetail).to(ProductDetail)
container.bind(TYPES.ProductPaginate).to(ProductsPaginate)
container.bind(TYPES.ProductUpdate).to(ProductUpdate)
container.bind(TYPES.ProductUserInterface).to(ProductWebApiUserInterface)
container.bind(TYPES.ProductApiClient).to(ProductWebApiClient).inSingletonScope()
container.bind(TYPES.ProductAdapter).to(Productdapter)

container.bind(TYPES.CatalogueProductClass).to(ProductClasses)
container.bind(TYPES.CatalogueProductClassUserInterface).to(ProductClassWebApiUserInterface)
container.bind(TYPES.CatalogueProductClassApiClient).to(ProductClassWebApiClient)
container.bind(TYPES.CatalogueProductClassAdapter).to(ProductClassAdapter)

// container.get<ProductClassAdapter>(TYPES.CatalogueProductClassAdapter).init();
container.get<Productdapter>(TYPES.ProductAdapter).init();

// container.get<CategoryAdapter>(TYPES.CatalogueCategoryAdapter).init()