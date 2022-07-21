import { Product, ProductPaginate } from './Product';

export interface ProductRepository {
  productPaginate(limit: number, startAfter: number): Promise<ProductPaginate>

  productCreate(product: Product): Promise<Product>

  productDetail(uid: string): Promise<Product>

  productUpdate(uid: string, product: Partial<Product>): Promise<Product>
}
