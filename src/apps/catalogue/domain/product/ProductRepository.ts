import { Product } from './Product'

export interface ProductRepository {
  getProducts(): Promise<Array<Product>>
}
