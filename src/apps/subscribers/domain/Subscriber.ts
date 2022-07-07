type SubscriberStatus = 'active' | 'inactive'

export class Subscriber {
  readonly id?: string
  readonly email: string
  readonly created_at?: number
  readonly modified_at?: number
  readonly status: SubscriberStatus
}

export type SubscriberPaginate = {
  limit: number,
  count: number,
  next: number,
  previous: number,
  results: Array<Subscriber>
}
