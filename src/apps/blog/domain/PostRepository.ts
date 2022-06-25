import { Post } from './Post'

export interface PostRepository {
  getAllPost(): Promise<Array<Post>>
  getLastPost(): Promise<Post>
}
