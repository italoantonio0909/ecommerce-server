export interface Customer {
  id?: string
  email: string
  password: string
  status: 'active' | 'inactive'
}
