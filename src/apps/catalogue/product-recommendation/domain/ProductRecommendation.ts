import { Product } from '../../product/domain/Product';

export class ProductRecommendation {
  readonly product: Product
  readonly recommendation: Product
  readonly ranking: number;
}
