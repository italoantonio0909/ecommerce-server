import { Subscriber } from '../../domain/Subscriber';

export interface SubscriberUserInterface {
  installSubscriberCreate(callback: (subscriber: Subscriber) => Promise<Subscriber>): Promise<Subscriber>;
}