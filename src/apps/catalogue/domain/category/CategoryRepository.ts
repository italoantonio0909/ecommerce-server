import { Category } from './Category'

export interface CategoryRepository {
  categoryPaginate(
    limit: number,
    startAfter: number
  ): Promise<{ categories: Array<Category>; startAfter: number }>

  categoryCreate(category: Category): Promise<Category>
}
