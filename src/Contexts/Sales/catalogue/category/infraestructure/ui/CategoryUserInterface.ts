import { Category } from '../../../category/domain/Category'
import { Paginate } from '../../../../../Shared/pagination/domain/Paginate';

export interface CategoryUserInterface {
  installCategoryPaginate(callback: (limit: number, startAfter: number) => Promise<Paginate<Category>>): void

  installCategoryCreate(callback: (category: Category) => Promise<Category>): void
}
