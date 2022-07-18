import { Subscriber, SubscriberPaginate } from '../../domain/Subscriber';

export interface SubscribersUserInterface {
  installSubscribersPaginate(callback: (limitOfDocuments: number, page: number) => Promise<SubscriberPaginate>): void

  installSubscriberCreate(callback: (subscriber: Subscriber) => Promise<Subscriber>): void

  installSubscriberDelete(callback: (id: string) => Promise<Subscriber>): void

  installSubscriberUpdate(callback: (id: string, subscriber: Partial<Subscriber>) => Promise<Subscriber>): void

  installSubscriberTotal(callback: () => Promise<{ subscribersTotal: number }>): void
}