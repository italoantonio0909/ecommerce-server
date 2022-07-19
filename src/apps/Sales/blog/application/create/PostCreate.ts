import { inject, injectable } from 'inversify'
import { BlogRepository } from '../../domain/BlogRepository';
import TYPES from '../../../../../container.types';
import { Post } from '../../domain/Blog';

@injectable()
export class PostCreate {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async create(post: Post): Promise<Post> {
    const data: Post = {
      ...post,
      created_at: new Date().getTime(),
      status: "active",
    }
    return await this.blogRepository.postCreate(data)
  }
}
