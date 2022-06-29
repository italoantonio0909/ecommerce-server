import { Product } from './Product'

export interface ProductRepository {
  productsAll(): Promise<Array<Product>>
}
