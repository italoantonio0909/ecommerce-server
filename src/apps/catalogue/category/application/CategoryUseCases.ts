import { inject, injectable } from 'inversify'
import { Category } from '../domain/Category'
import TYPES from '../../../../../container.types'
import { CategoryRepository } from '../domain/CategoryRepository';

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
