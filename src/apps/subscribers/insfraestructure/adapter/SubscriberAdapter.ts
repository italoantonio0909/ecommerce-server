import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types'
import { SubscribersUserInterface } from '../ui/SubscribersUserInterface'
import { SubscriberUpdate } from '../../application/update/SubscriberUpdate';
import { SubscriberCreate } from '../../application/create/SubscriberCreate';
import { SubscribersPaginate } from '../../application/paginate/SubscriberPaginate';
import { Subscriber } from '../../domain/Subscriber';
import { SubscriberDelete } from '../../application/delete/SubscribersDelete';

@injectable()
export class SubscriberAdapter {
  constructor(
    @inject(TYPES.SubscriberUserInterface)
    private subscribersUserInterface: SubscribersUserInterface,
    @inject(TYPES.SubscriberPaginate) private subscriberPaginate: SubscribersPaginate,
    @inject(TYPES.SubscriberCreate) private subscriberCreate: SubscriberCreate,
    @inject(TYPES.SubscriberUpdate) private subscriberUpdate: SubscriberUpdate,
    @inject(TYPES.SubscriberDelete) private subscriberdelete: SubscriberDelete

  ) { }

  init() {
    this.subscribersUserInterface.installSubscribersPaginate((limit: number, startAfter: number) =>
      this.subscriberPaginate.paginate(limit, startAfter)
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
  }
}
