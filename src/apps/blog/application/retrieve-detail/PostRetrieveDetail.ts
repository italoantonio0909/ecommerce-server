import { inject, injectable } from 'inversify'
import { Post } from '../../domain/Blog';
import TYPES from '../../../../../container.types';
import { BlogRepository } from '../../domain/BlogRepository';

@injectable()
export class PostRetrieveDetail {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async retrieveDetail(postUid: string): Promise<Post> {
    return await this.blogRepository.postRetrieveDetail(postUid)
  }

}
