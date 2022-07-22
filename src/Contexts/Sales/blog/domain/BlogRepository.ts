import { Comment, Post, PostPaginate } from './Blog';

export interface BlogRepository {
  postPaginate(limit: number, startAfter: number): Promise<PostPaginate>

  postRetrieveDetail(postUid: string): Promise<Post>;

  postCreate(post: Post): Promise<Post>;

  postUpdate(postUid: string, post: Partial<Post>): Promise<Post>;

  postPublish(postUId: string, post: Partial<Post>): Promise<Post>;

  postDelete(postUid: string): Promise<Post>;

  postAddComment(postUid: string, comment: Array<Comment>): Promise<any>;
}
