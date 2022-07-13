import { inject, injectable } from 'inversify'
import { Post } from '../../domain/Blog';
import TYPES from '../../../../../container.types';
import { BlogRepository } from '../../domain/BlogRepository';

@injectable()
export class PostPublish {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async publish(postUid: string): Promise<Post> {
    const post: Partial<Post> = {
      publish_at: new Date().getTime(),
      is_public: true
    }

    return await this.blogRepository.postPublish(postUid, post)
  }
}
