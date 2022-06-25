export interface Subscriber {
  id?: string
  email: string
  created_at?: number
  modified_at?: number
  status: 'active' | 'inactive'
}
