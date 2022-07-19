import { inject, injectable } from 'inversify'
import { BlogRepository } from '../../domain/BlogRepository';
import TYPES from '../../../../../container.types';
import { Comment } from '../../domain/Blog';

@injectable()
export class PostAddComment {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async addComment(postUid: string, data: Comment): Promise<any> {
    const createdAt = new Date().getTime()

    const comment = [{ ...data, created_at: createdAt }]

    return await this.blogRepository.postAddComment(postUid, comment);
  }
}
