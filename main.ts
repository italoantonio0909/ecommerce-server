import 'reflect-metadata'
// import { container } from './src/apps/subscribers/container'
// import { SubscriberAdapter } from './src/apps/subscribers/insfraestructure/adapter/SubscriberAdapter'
import TYPES from './container.types'
import { container } from './src/apps/catalogue/container'
// import { container } from './src/apps/subscribers/container'
// import { CustomerAdapter } from './src/apps/customers/infraestructure/adapter/CustomerAdapter'
// import { container } from './src/apps/customers/container'
import { CategoryAdapter } from './src/apps/catalogue/infraestructure/category/adapter/CategoryAdapter'

container.get<CategoryAdapter>(TYPES.CatalogueCategoryAdapter).init()
