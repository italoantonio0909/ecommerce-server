import { Subscriber, SubscriberPaginate } from './Subscriber';

export interface SubscribersRepository {
  subscribersPaginate(limit: number, startAfter: number): Promise<SubscriberPaginate>;

  subscriberCreate(subscriber: Subscriber): Promise<Subscriber>

  subscriberDelete(id: string): Promise<Subscriber>

  subscriberFilter(email: string): Promise<Array<Subscriber>>;
}
