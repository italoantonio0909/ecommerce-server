import { Category } from '../../../category/domain/Category'
import { CategoryPaginate } from '../../domain/Category';

export interface CategoryUserInterface {
  installCategoryPaginate(callback: (limit: number, startAfter: number) => Promise<CategoryPaginate>): void

  installCategoryCreate(callback: (category: Category) => Promise<Category>): void
}
