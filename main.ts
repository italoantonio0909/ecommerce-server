import 'reflect-metadata'
// import { container } from './src/apps/subscribers/container'
import { SubscriberAdapter } from './src/apps/subscribers/insfraestructure/adapter/SubscriberAdapter';
import TYPES from './container.types'
import { container } from './src/apps/blog/container'
// import { container } from './src/apps/catalogue/container'
// import { CustomerAdapter } from './src/apps/customers/infraestructure/adapter/CustomerAdapter'
// import { container } from './src/apps/customers/container'
// import { CategoryAdapter } from './src/apps/catalogue/category/infraestructure/adapter/CategoryAdapter'
import { BlogAdapter } from './src/apps/blog/insfraestructure/adapter/BlogAdapter';

container.get<BlogAdapter>(TYPES.BlogAdapter).init()
