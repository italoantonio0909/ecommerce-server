import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import { SubscriberUpdate } from '../../application/update/SubscriberUpdate';
import { SubscriberCreate } from '../../application/create/SubscriberCreate';
import { SubscriberPaginate } from '../../domain/Subscriber';
import { SubscribersPaginate } from '../../application/paginate/SubscriberPaginate';

@injectable()
export class SubscriberAdapter {
  constructor(
    @inject(TYPES.SubscriberUserInterface)
    private subscribersUserInterface: SubscribersUserInterface,
    @inject(TYPES.Subscribers) private subscribers: SubscribersPaginate
  ) { }

  init() {
    this.subscribersUserInterface.installSubscribersPaginate((limit: number, startAfter: number) =>
      this.subscribers.subscribersPaginate(limit, startAfter)
    )
    // this.subscribersUserInterface.installSubscriberCreate(
    //   (subscriber: Subscriber) => this.subscribers.subscriberCreate(subscriber)
    // )
    // this.subscribersUserInterface.installSubscriberDelete((id: string) =>
    //   this.subscribers.subscriberDelete(id)
    // )
    // this.subscribersUserInterface.installSubscriberUpdate((id: string) =>
    //   this.subscribers.SubscriberUpdate(id)
    // )
  }
}
