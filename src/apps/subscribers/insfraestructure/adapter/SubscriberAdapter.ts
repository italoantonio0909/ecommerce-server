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
    this.subscribersUserInterface.installGetSubscribers(() =>
      this.subscribers.getSubscribers()
    )
    this.subscribersUserInterface.installCreateSubscribers(
      (subscriber: Subscriber) => this.subscribers.createSubscriber(subscriber)
    )
  }
}
