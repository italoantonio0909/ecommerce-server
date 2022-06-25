export interface Comment {
  content: string
  status: 'active' | 'inactive'
  created_at?: number
  modified_at?: number
}
