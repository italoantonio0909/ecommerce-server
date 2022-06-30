import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import { Subscribers } from '../../application/Subscribers'
import { Subscriber } from '../../domain/Subscriber'

@injectable()
export class SubscriberAdapter {
  constructor(
    @inject(TYPES.SubscriberUserInterface)
    private subscribersUserInterface: SubscribersUserInterface,
    @inject(TYPES.Subscribers) private subscribers: Subscribers
  ) { }

  init() {
    this.subscribersUserInterface.installSubscribersPaginate((limit: number, startAfter: number) =>
      this.subscribers.subscribersPaginate(limit, startAfter)
    )
    this.subscribersUserInterface.installSubscriberCreate(
      (subscriber: Subscriber) => this.subscribers.subscriberCreate(subscriber)
    )
    this.subscribersUserInterface.installSubscriberDelete((id: string) =>
      this.subscribers.subscriberDelete(id)
    )
  }
}
