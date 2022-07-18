import { Subscriber, SubscriberPaginate } from './Subscriber';

export interface SubscribersRepository {
  subscribersPaginate(limitOfDocuments: number, page: number): Promise<SubscriberPaginate>;

  subscriberCreate(subscriber: Subscriber): Promise<Subscriber>;

  subscriberUpdate(uid: string, subscriber: Partial<Subscriber>): Promise<Subscriber>;

  subscriberDelete(uid: string): Promise<Subscriber>;

  subscriberSearch(email: string): Promise<Subscriber>;

  subscribersTotal(): Promise<{ subscribersTotal: number }>;
}
