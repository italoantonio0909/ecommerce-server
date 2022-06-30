import { Category } from '../../../domain/category/Category'

export interface CategoryUserInterface {
  installCategoryPaginate(
    callback: (
      limit: number,
      startAfter: number
    ) => Promise<{ categories: Array<Category>; startAfter: number }>
  ): void
  installCategoryCreate(
    callback: (category: Category) => Promise<Category>
  ): void
}
