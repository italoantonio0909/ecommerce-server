import { Post, PostPaginate } from '../../domain/Blog';

export interface BlogUserInterface {
  installPostPaginate(callback: (limit: number, startAfter: number) => Promise<PostPaginate>): void

  installPostCreate(callback: (post: Post) => Promise<Post>): void

  installPostDelete(callback: (postUid: string) => Promise<Post>): void

  installPostPublish(callback: (postUid: string) => Promise<Post>): void
}
