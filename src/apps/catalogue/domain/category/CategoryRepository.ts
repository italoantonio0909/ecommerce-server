import { Category } from './Category'

export interface CategoryRepository {
  categoryAll(): Promise<Array<Category>>
}
