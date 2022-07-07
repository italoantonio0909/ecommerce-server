import { Category, CategoryPaginate } from './Category';

export interface CategoryRepository {
  categoryPaginate(limit: number, startAfter: number): Promise<CategoryPaginate>

  categoryCreate(category: Category): Promise<Category>

  categorySearch(name: string): Promise<Category>
}
