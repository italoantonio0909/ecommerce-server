import { Subscriber } from './Subscriber';

export interface SubscribersRepository {
  create(subscriber: Subscriber): Promise<Subscriber>;

  searchByEmail(email: string): Promise<Subscriber>;
}
