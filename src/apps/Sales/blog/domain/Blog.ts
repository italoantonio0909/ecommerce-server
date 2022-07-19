import { Customer } from '../../customers/domain/Customer';

type PostStatus = "active" | "inactive"

type CommentStatus = "active" | "inactive" | "banned"

export type PostPaginate = {
  limit: number,
  count: number,
  next: number,
  previous: number,
  results: Array<Post>
}

export class Comment {
  readonly created_by: Customer;
  readonly content: string
  readonly status: CommentStatus
  readonly created_at?: number
  readonly modified_at?: number
}

export class Post {
  readonly id?: string;
  readonly title: string
  readonly meta_description: string;
  readonly description: string
  readonly image: string
  readonly number_comments: number
  readonly comments: Array<Comment>
  readonly status: PostStatus;
  readonly is_public: boolean
  readonly publish_at?: number
  readonly created_at?: number
  readonly modified_at?: number
}


