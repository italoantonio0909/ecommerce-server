type BackOfficeSubscriberStatus = 'active' | 'inactive'

export class BackofficeSubscriber {
  readonly id?: string
  readonly email: string
  readonly created_at?: number
  readonly modified_at?: number
  readonly status: BackOfficeSubscriberStatus
}