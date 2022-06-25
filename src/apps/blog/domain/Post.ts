import { Comment } from './Comment'

export interface Post {
  title: string
  description: string
  image: string
  number_comments: number
  comment: Array<Comment>
  status: 'active' | 'inactive'
  created_at?: number
  modified_at?: number
}
