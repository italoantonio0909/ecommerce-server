import { Subscriber, SubscriberPaginate } from './Subscriber';

export interface SubscribersRepository {
  subscribersPaginate(limit: number, startAfter: number): Promise<SubscriberPaginate>;

  subscriberCreate(subscriber: Subscriber): Promise<Subscriber>;

  subscriberUpdate(uid: string, subscriber: Partial<Subscriber>): Promise<Subscriber>;

  subscriberDelete(id: string): Promise<Subscriber>;

  subscriberSearch(email: string): Promise<Subscriber>;
}
