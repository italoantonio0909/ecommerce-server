import { Category } from '../../category/domain/Category'
import { ProductClass } from '../../product-class/ProductClass'

type ProductStructure = 'standalone' | 'parent' | 'child'

export interface Product {
  readonly structure: ProductStructure
  readonly is_public: boolean
  readonly parent: Product
  readonly title: string
  readonly description: string
  readonly product_class: ProductClass
  readonly categories: Array<Category>
  readonly is_discountable: boolean
  readonly rating: boolean
  readonly created_at?: number
  readonly modified_at?: number
}
