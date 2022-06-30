import { inject, injectable } from 'inversify'
import { CategoryUseCases } from '../../../application/category/CategoryUseCases'
import { CategoryUserInterface } from '../ui/CategoryUserInterface'
import TYPES from '../../../../../../container.types'
import { Category } from '../../../domain/category/Category'

@injectable()
export class CategoryAdapter {
  constructor(
    @inject(TYPES.CatalogueCategoryUserInterface)
    private readonly categoryUserInterface: CategoryUserInterface,
    @inject(TYPES.CatalogueCategory)
    private readonly categoryUseCases: CategoryUseCases
  ) { }

  init() {
    this.categoryUserInterface.installCategoryPaginate(
      (limit: number, startAfter: number) =>
        this.categoryUseCases.categoryPaginate(limit, startAfter)
    )
    this.categoryUserInterface.installCategoryCreate((category: Category) =>
      this.categoryUseCases.categoryCreate(category)
    )
  }
}
