import { inject, injectable } from 'inversify'
import { PostRepository } from '../domain/PostRepository'
import { Post } from '../domain/Post'
import TYPES from '../../../../container.types'

@injectable()
export class PostUseCases {
  constructor(
    @inject(TYPES.PostWebApiClient) private postRepository: PostRepository
  ) {}

  async getAllPost(): Promise<Array<Post>> {
    return await this.postRepository.getAllPost()
  }

  async getLastPost(): Promise<Post> {
    return await this.postRepository.getLastPost()
  }
}
