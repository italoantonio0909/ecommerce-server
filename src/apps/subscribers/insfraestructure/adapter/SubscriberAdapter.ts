import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import { SubscriberUseCases } from '../../application/SubscriberUseCases'
import { Subscriber } from '../../domain/Subscriber'

@injectable()
export class SubscriberAdapter {
  constructor(
    @inject(TYPES.SubscriberUserInterface)
    private subscribersUserInterface: SubscribersUserInterface,
    @inject(TYPES.Subscribers) private subscribers: SubscriberUseCases
  ) {}

  init() {
    this.subscribersUserInterface.installSubscribersAll((limit: number) =>
      this.subscribers.subscribersAll(limit)
    )
    this.subscribersUserInterface.installSubscriberCreate(
      (subscriber: Subscriber) => this.subscribers.subscriberCreate(subscriber)
    )
    this.subscribersUserInterface.installSubscriberDelete((email: string) =>
      this.subscribers.subscriberDelete(email)
    )
  }
}
