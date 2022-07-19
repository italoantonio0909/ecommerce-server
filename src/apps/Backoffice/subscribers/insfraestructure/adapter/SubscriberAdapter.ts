import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types'
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import { SubscriberUpdate } from '../../application/update/SubscriberUpdate';
import { SubscriberCreate } from '../../application/create/BackofficeSubscriberCreate';
import { SubscribersPaginate } from '../../application/paginate/BackofficeSubscriberPaginate';
import { Subscriber } from '../../domain/BackofficeSubscriber';
import { SubscriberDelete } from '../../application/delete/BackofficeSubscribersDelete';
import { SubscriberTotal } from '../../application/total/BackofficeSubscribersTotal';

@injectable()
export class SubscriberAdapter {
  constructor(
    @inject(TYPES.SubscriberUserInterface)
    private subscribersUserInterface: SubscribersUserInterface,
    @inject(TYPES.SubscriberPaginate) private subscriberPaginate: SubscribersPaginate,
    @inject(TYPES.SubscriberCreate) private subscriberCreate: SubscriberCreate,
    @inject(TYPES.SubscriberUpdate) private subscriberUpdate: SubscriberUpdate,
    @inject(TYPES.SubscriberDelete) private subscriberdelete: SubscriberDelete,
    @inject(TYPES.SubscriberTotal) private subscriberTotal: SubscriberTotal
  ) { }

  init() {
    this.subscribersUserInterface.installSubscribersPaginate((limitOfDocuments: number, page: number) =>
      this.subscriberPaginate.paginate(limitOfDocuments, page)
    )
    this.subscribersUserInterface.installSubscriberCreate(
      (subscriber: Subscriber) => this.subscriberCreate.create(subscriber)
    )
    this.subscribersUserInterface.installSubscriberDelete((id: string) =>
      this.subscriberdelete.delete(id)
    )
    this.subscribersUserInterface.installSubscriberUpdate((uid: string, subscriber: Partial<Subscriber>) =>
      this.subscriberUpdate.update(uid, subscriber)
    )
    this.subscribersUserInterface.installSubscriberTotal(() =>
      this.subscriberTotal.total()
    )
  }
}
