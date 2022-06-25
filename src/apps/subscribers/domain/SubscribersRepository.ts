import { Subscriber } from './Subscriber'

export interface SubscribersRepository {
  getSubscribers(): Promise<Array<Subscriber>>
  createSubscriber(subscriber: Subscriber): Promise<Subscriber>
  deleteSubscriber(email: string): Promise<any>
}
