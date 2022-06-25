import { Category } from './Category'

export interface CategoryRepository {
  getCategories(): Promise<Array<Category>>
}
