import { Subscriber } from '../../domain/Subscriber';

export interface SubscribersUserInterface {
  installSubscriberCreate(callback: (subscriber: Subscriber) => Promise<Subscriber>): void
}