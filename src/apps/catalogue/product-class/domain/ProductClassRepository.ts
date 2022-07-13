import { ProductClass, ProductClassPaginate } from './ProductClass';

export interface ProductClassRepository {
  productClassPaginate(limit: number, startAfter: number): Promise<ProductClassPaginate>

  productClassGet(limit: number): Promise<Array<ProductClass>>;

  productClassCreate(productClass: ProductClass): Promise<ProductClass>;

  productClassUpdate(uid: string, productClass: Partial<ProductClass>): Promise<ProductClass>;
}
