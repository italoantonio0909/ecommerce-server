import { inject, injectable } from 'inversify'
import { Category } from '../domain/Category';
import TYPES from '../../../../../container.types'
import { CategoryRepository } from '../domain/CategoryRepository';
import { CategoryAlreadyExists } from '../domain/CategoryAlreadyExists';
import { Paginate } from '../../../shared/pagination/domain/Paginate';

@injectable()
export class Categories {
  constructor(
    @inject(TYPES.CatalogueCategoryApiClient)
    private readonly categoryRepository: CategoryRepository
  ) { }

  async categoryPaginate(limit: number, startAfter: number): Promise<Paginate<Category>> {
    return await this.categoryRepository.categoryPaginate(limit, startAfter)
  }

  async categorySearch(name: string): Promise<Category> {
    return await this.categoryRepository.categorySearch(name)
  }

  async categoryCreate(data: Category): Promise<Category> {
    const exist = await this.categorySearch(data.name);
    if (exist !== null) {
      throw new CategoryAlreadyExists()
    }

    const category: Category = {
      ...data,
      created_at: new Date().getTime(),
      modified_at: new Date().getTime(),
    }
    return await this.categoryRepository.categoryCreate(category)
  }

}
