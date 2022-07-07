import { Post, PostPaginate, Comment } from '../../domain/Blog';

export interface BlogUserInterface {
  installPostPaginate(callback: (limit: number, next: number) => Promise<PostPaginate>): void

  installPostCreate(callback: (post: Post) => Promise<Post>): void

  installPostDelete(callback: (postUid: string) => Promise<Post>): void

  installPostPublish(callback: (postUid: string) => Promise<Post>): void

  installPostAddComment(callback: (postUid: string, comment: Comment) => Promise<any>): void
}
