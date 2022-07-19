import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types'
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import { SubscriberCreate } from '../../application/create/SubscriberCreate';
import { Subscriber } from '../../domain/Subscriber';

@injectable()
export class SubscriberAdapter {
  constructor(
    @inject(TYPES.SubscriberUserInterface)
    private subscribersUserInterface: SubscribersUserInterface,
    @inject(TYPES.SubscriberCreate) private subscriberCreate: SubscriberCreate,
  ) { }

  init() {
    this.subscribersUserInterface.installSubscriberCreate(
      (subscriber: Subscriber) => this.subscriberCreate.create(subscriber)
    )
  }
}
