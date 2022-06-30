type SubscriberStatus = 'active' | 'inactive'

export class Subscriber {
  readonly id?: string
  readonly email: string
  readonly created_at?: number
  readonly modified_at?: number
  readonly status: SubscriberStatus
}

export type SubscriberPaginate = { subscribers: Array<Subscriber>, startAfter: number }
