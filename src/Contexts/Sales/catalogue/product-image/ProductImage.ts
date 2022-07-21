import { Product } from '../product/domain/Product';

export class ProductImage {
  readonly product: Product;
  readonly original: string;
  readonly caption: string;
  readonly date_created: number;
}
