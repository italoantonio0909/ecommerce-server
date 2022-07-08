import { ProductClass, ProductClassPaginate } from './ProductClass';

export interface ProductClassRepository {
  productClassPaginate(limit: number, startAfter: number): Promise<ProductClassPaginate>

  productClassCreate(): Promise<ProductClass>
}
