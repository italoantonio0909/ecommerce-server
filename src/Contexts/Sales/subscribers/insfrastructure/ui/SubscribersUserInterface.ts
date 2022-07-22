import { Subscriber } from '../../domain/Subscriber';

export interface SubscriberUserInterface {
  installSubscriberCreate(subscriber: Subscriber): Promise<Subscriber>;
}