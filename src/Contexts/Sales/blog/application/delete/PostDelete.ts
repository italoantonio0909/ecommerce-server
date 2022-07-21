import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types';
import { BlogRepository } from '../../domain/BlogRepository';
import { Post } from '../../domain/Blog';


@injectable()
export class PostDelete {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async delete(postUid: string): Promise<Post> {
    return await this.blogRepository.postDelete(postUid)
  }

}
