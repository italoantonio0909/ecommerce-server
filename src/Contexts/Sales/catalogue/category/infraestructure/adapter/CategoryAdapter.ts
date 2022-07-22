import { inject, injectable } from 'inversify'
import { CategoryUserInterface } from '../ui/CategoryUserInterface'
import { Category } from '../../domain/Category'
import { Categories } from '../../application/Categories';
import TYPES from '../../../../../../../container.types';

@injectable()
export class CategoryAdapter {
  constructor(
    @inject(TYPES.CatalogueCategoryUserInterface)
    private readonly categoryUserInterface: CategoryUserInterface,
    @inject(TYPES.CatalogueCategory)
    private readonly categories: Categories
  ) { }

  init() {
    this.categoryUserInterface.installCategoryPaginate(
      (limit: number, startAfter: number) =>
        this.categories.categoryPaginate(limit, startAfter)
    )
    this.categoryUserInterface.installCategoryCreate((category: Category) =>
      this.categories.categoryCreate(category)
    )
  }
}
