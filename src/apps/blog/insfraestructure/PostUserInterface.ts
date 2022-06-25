import { Post } from '../domain/Post'

export interface PostUserInterface {
  installGetAllPost(callback: () => Promise<Array<Post>>): void
  installGetLastPost(callback: () => Promise<Post>): void
}
