import { Comment } from './Comment'
import { Tags } from './Tags';

type PostStatus = "active" | "inactive"

export class Post {
  readonly id?: string;
  readonly title: string
  readonly meta_description: string;
  readonly description: string
  readonly image: string
  readonly number_comments: number
  readonly comments: Array<Comment>
  readonly status: PostStatus;
  readonly tags: Array<Tags>
  readonly is_public: boolean
  readonly publish_at?: number
  readonly created_at?: number
  readonly modified_at?: number
}
