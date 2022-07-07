import { inject, injectable } from 'inversify'
import { BlogRepository } from '../domain/BlogRepository'
import { Comment, Post, PostPaginate } from '../domain/Blog'
import TYPES from '../../../../container.types'

@injectable()
export class Blogs {
  constructor(
    @inject(TYPES.BlogWebApiClient) private blogRepository: BlogRepository
  ) { }

  async postPaginate(limit: number, startAfter: number): Promise<PostPaginate> {
    return await this.blogRepository.postPaginate(limit, startAfter);
  }

  async postCreate(post: Post): Promise<Post> {
    const data: Post = {
      ...post,
      created_at: new Date().getTime(),
      status: "active",
    }
    return await this.blogRepository.postCreate(data)
  }

  async postDelete(postUid: string): Promise<Post> {
    return await this.blogRepository.postDelete(postUid)
  }

  async postUpdate(postUid: string, post: Partial<Post>): Promise<Post> {
    return await this.blogRepository.postUpdate(postUid, post)
  }

  async postPublish(postUid: string): Promise<Post> {
    return await this.blogRepository.postPublish(postUid)
  }

  async postAddComment(postUid: string, data: Comment): Promise<any> {
    const createdAt = new Date().getTime()

    const comment = [{ ...data, created_at: createdAt }]

    return await this.blogRepository.postAddComment(postUid, comment);
  }
}
