import { inject, injectable } from 'inversify'
import { CategoryRepository } from '../../domain/category/CategoryRepository'
import { Category } from '../../domain/category/Category'
import TYPES from '../../../../../container.types'

@injectable()
export class CategoryUseCases {
  constructor(
    @inject(TYPES.CatalogueCategoryApiClient)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async categoryAll(): Promise<Array<Category>> {
    const categories = await this.categoryRepository.categoryAll()
    return categories.filter(({ is_public }) => is_public === true)
  }
}
