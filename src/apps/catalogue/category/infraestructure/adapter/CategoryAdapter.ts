import { inject, injectable } from 'inversify'
import { CategoryUserInterface } from '../ui/CategoryUserInterface'
import TYPES from '../../../../../../container.types'
import { Category } from '../../domain/Category'
import { Categories } from '../../application/Categories';

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
