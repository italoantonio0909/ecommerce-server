import { Post, PostPaginate } from './Blog';

export interface BlogRepository {
  postPaginate(limit: number, startAfter: number): Promise<PostPaginate>

  postCreate(post: Post): Promise<Post>

  postPublish(postUId: string): Promise<Post>

  postDelete(postUid: string): Promise<Post>

  postAddComment(comment: Comment): Promise<any>

}
