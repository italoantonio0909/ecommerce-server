import { Subscriber, SubscriberPaginate } from '../../domain/Subscriber';

export interface SubscribersUserInterface {
  installSubscribersPaginate(callback: (limit: number, startAfter: number) => Promise<SubscriberPaginate>): void

  installSubscriberCreate(callback: (subscriber: Subscriber) => Promise<Subscriber>): void

  installSubscriberDelete(callback: (id: string) => Promise<Subscriber>): void
}