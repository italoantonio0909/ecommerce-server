import { Subscriber } from '../../domain/Subscriber';
import { Paginate } from '../../../../shared/pagination/domain/Paginate';

export interface SubscribersUserInterface {
  installSubscribersPaginate(callback: (limitOfDocuments: number, page: number) => Promise<Paginate<Subscriber>>): void

  installSubscriberCreate(callback: (subscriber: Subscriber) => Promise<Subscriber>): void

  installSubscriberDelete(callback: (id: string) => Promise<Subscriber>): void

  installSubscriberUpdate(callback: (id: string, subscriber: Partial<Subscriber>) => Promise<Subscriber>): void

  installSubscriberTotal(callback: () => Promise<{ subscribersTotal: number }>): void
}