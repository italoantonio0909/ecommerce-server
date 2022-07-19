import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';
import { Paginate } from '../../../../Shared/pagination/domain/Paginate';

export interface BackofficeSubscribersUserInterface {
  installBackofficeSubscribersPaginate(callback: (limitOfDocuments: number, page: number) => Promise<Paginate<BackofficeSubscriber>>): void

  installBackofficeSubscriberCreate(callback: (BackofficeSubscriber: BackofficeSubscriber) => Promise<BackofficeSubscriber>): void

  installBackofficeSubscriberDelete(callback: (id: string) => Promise<BackofficeSubscriber>): void

  installBackofficeSubscriberUpdate(callback: (id: string, BackofficeSubscriber: Partial<BackofficeSubscriber>) => Promise<BackofficeSubscriber>): void

  installBackofficeSubscriberTotal(callback: () => Promise<{ subscribersTotal: number }>): void
}