import { Product } from './Product'

export interface ProductRepository {
  productPaginate(limit: number, startAfter: number): Promise<{ products: Array<Product>, startAfter: number }>

  productCreate(product: Product): Promise<Product>

  productDetail(id: string): Promise<Product>
}
