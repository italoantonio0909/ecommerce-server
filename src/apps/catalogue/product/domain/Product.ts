import { Category } from "../../category/domain/Category"
import { ProductClass } from "../../product-class/domain/ProductClass"
export type ProductStructure = "standalone" | "parent" | "child"

export type ProductPaginate = {
  limit: number,
  count: number,
  next: number,
  previous: number,
  results: Array<Product>
}

export class Product {
  readonly structure: ProductStructure;
  readonly is_public: boolean;
  readonly parent: Product;
  readonly title: string;
  readonly description: string;
  readonly meta_title: string;
  readonly meta_description: string;
  readonly product_class: ProductClass;
  readonly categories: Array<Category>;
  readonly is_discountable: boolean;
  readonly recommended_products: Array<Product>;
  readonly rating: number;
  readonly created_at?: number;
  readonly modified_at?: number;
}
