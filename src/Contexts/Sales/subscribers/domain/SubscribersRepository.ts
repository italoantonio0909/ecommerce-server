import { Subscriber } from './Subscriber';

export interface SubscribersRepository {
  subscriberCreate(subscriber: Subscriber): Promise<Subscriber>;
}
