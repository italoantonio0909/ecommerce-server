import { Post } from './Post'

export class PostRepository {
  postPaginate: Promise<PostPaginate>

  postCreate: Promise<Post>

  postPublish: Promise<Post>

  postDelete: Promise<Post>

}

export type PostPaginate = { posts: Array<Array<Post>>, startAfter: number }