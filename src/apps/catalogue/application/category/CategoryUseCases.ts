import { inject, injectable } from 'inversify'
import { CategoryRepository } from '../../domain/category/CategoryRepository'
import { Category } from '../../domain/category/Category'
import TYPES from '../../../../../container.types'

@injectable()
export class CategoryUseCases {
  constructor(
    @inject(TYPES.CatalogueCategoryApiClient)
    private readonly categoryRepository: CategoryRepository
  ) { }

  async categoryPaginate(limit: number, startAfter: number): Promise<{ categories: Array<Category>; startAfter: number }> {
    const { categories, startAfter: startAfterResult } = await this.categoryRepository.categoryPaginate(limit, startAfter)

    const result = categories.filter(({ is_public }) => is_public === true)

    return { categories: result, startAfter: startAfterResult }
  }

  async categoryCreate(data: Category): Promise<Category> {
    const category: Category = {
      ...data,
      created_at: new Date().getTime(),
      modified_at: new Date().getTime(),
    }
    return await this.categoryRepository.categoryCreate(category)
  }
}
