import { Subscriber } from './Subscriber'

export interface SubscribersRepository {
  subscribersAll(limit: number): Promise<Array<Subscriber>>
  subscriberCreate(subscriber: Subscriber): Promise<Subscriber>
  subscriberDelete(email: string): Promise<any>
}
