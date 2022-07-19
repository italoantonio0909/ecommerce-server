import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types'
import { BackofficeSubscribersUserInterface } from '../ui/BackofficeSubscribersUserInterface';
import { BackOfficeSubscribersPaginate } from '../../application/paginate/BackofficeSubscriberPaginate';
import { BackOfficeSubscriberCreate } from '../../application/create/BackofficeSubscriberCreate';
import { BackofficeSubscriberUpdate } from '../../application/update/BackofficeSubscriberUpdate';
import { BackofficeSubscriberDelete } from '../../application/delete/BackofficeSubscribersDelete';
import { BackofficeSubscriberTotal } from '../../application/total/BackofficeSubscribersTotal';
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';

@injectable()
export class SubscriberAdapter {
  constructor(
    @inject(TYPES.SubscriberDelete) private backofficeSubscriberDelete: BackofficeSubscriberDelete,
    @inject(TYPES.SubscriberUserInterface) private ui: BackofficeSubscribersUserInterface,
    @inject(TYPES.SubscriberCreate) private create: BackOfficeSubscriberCreate,
    @inject(TYPES.SubscriberPaginate) private paginate: BackOfficeSubscribersPaginate,
    @inject(TYPES.SubscriberUpdate) private update: BackofficeSubscriberUpdate,
    @inject(TYPES.SubscriberTotal) private total: BackofficeSubscriberTotal,
  ) { }

  init() {

    this.ui.installBackofficeSubscribersPaginate((limitOfDocuments: number, page: number) =>
      this.paginate.paginate(limitOfDocuments, page)
    )
    this.ui.installBackofficeSubscriberCreate(
      (subscriber: BackofficeSubscriber) => this.create.create(subscriber)
    )
    this.ui.installBackofficeSubscriberDelete((id: string) =>
      this.backofficeSubscriberDelete.delete(id)
    )
    this.ui.installBackofficeSubscriberUpdate((uid: string, subscriber: Partial<BackofficeSubscriber>) =>
      this.update.update(uid, subscriber)
    )
    this.ui.installBackofficeSubscriberTotal(() =>
      this.total.total()
    )
  }
}
