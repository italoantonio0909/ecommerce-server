import { Customer } from '../../customers/domain/Customer';
type CommentStatus = "active" | "inactive"

export class Comment {
  readonly created_by: Customer;
  readonly content: string
  readonly status: CommentStatus
  readonly created_at?: number
  readonly modified_at?: number
}
