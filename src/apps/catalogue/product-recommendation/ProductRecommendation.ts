import { Product } from '../product/domain/Product';

export class ProductRecommendation {
  product: Product
  recommendation: Product
  ranking: number;
}
