import { ProductClass } from './ProductClass'

export interface ProductClassRepository {
  getProductClass(): Promise<Array<ProductClass>>
}
