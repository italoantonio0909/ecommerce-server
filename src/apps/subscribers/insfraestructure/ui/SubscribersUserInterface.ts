import { Subscriber } from '../../domain/Subscriber'

export interface SubscribersUserInterface {
  installGetSubscribers(callback: () => Promise<Array<Subscriber>>): void
  installCreateSubscribers(
    callback: (subscriber: Subscriber) => Promise<Subscriber>
  ): void
  installDeleteSubscriber(
    callback: (email: string) => Promise<Subscriber>
  ): void
}
