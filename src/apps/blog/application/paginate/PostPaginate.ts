import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types';
import { PostPaginate } from '../../domain/Blog';
import { BlogRepository } from '../../domain/BlogRepository';


@injectable()
export class PostsPaginate {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async paginate(limit: number, startAfter: number): Promise<PostPaginate> {
    return await this.blogRepository.postPaginate(limit, startAfter);
  }
}
