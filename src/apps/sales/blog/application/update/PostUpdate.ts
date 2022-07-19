import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types';
import { BlogRepository } from '../../domain/BlogRepository';
import { Post } from '../../domain/Blog';

@injectable()
export class PostUpdate {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async update(postUid: string, post: Partial<Post>): Promise<Post> {
    return await this.blogRepository.postUpdate(postUid, post)
  }
}
