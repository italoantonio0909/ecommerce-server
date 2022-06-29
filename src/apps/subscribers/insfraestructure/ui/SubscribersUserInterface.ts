import { Subscriber } from '../../domain/Subscriber'

export interface SubscribersUserInterface {
  installSubscribersAll(
    callback: (limit: number) => Promise<Array<Subscriber>>
  ): void
  installSubscriberCreate(
    callback: (subscriber: Subscriber) => Promise<Subscriber>
  ): void
  installSubscriberDelete(
    callback: (email: string) => Promise<Subscriber>
  ): void
}
