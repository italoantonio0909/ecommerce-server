import { Category } from './Category';
import { Paginate } from '../../../shared/pagination/domain/Paginate';

export interface CategoryRepository {
  categoryPaginate(limit: number, startAfter: number): Promise<Paginate<Category>>

  categoryCreate(category: Category): Promise<Category>

  categorySearch(name: string): Promise<Category>
}
