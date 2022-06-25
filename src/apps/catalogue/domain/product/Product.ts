import { Category } from '../category/Category'
import { ProductClass } from '../product-class/ProductClass'

export interface Product {
  structure: 'standalone' | 'parent' | 'child'
  is_public: boolean
  title: string
  description: string
  product_class: ProductClass
  rating: boolean
  created_at?: number
  modified_at?: number
  categories: Array<Category>
  is_discountable: boolean
}
