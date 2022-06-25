import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { SubscribersRepository } from '../domain/SubscribersRepository'
import { Subscriber } from '../domain/Subscriber'

@injectable()
export class SubscriberUseCases {
  constructor(
    @inject(TYPES.SubscriberApiClient)
    private subscribersRepository: SubscribersRepository
  ) {}

  async getSubscribers(): Promise<Array<Subscriber>> {
    const subscribers = await this.subscribersRepository.getSubscribers()
    return subscribers.filter(({ status }) => status === 'active')
  }

  async createSubscriber({ email }: Subscriber): Promise<Subscriber> {
    const data: Subscriber = {
      email,
      status: 'active',
      created_at: new Date().getTime(),
      modified_at: new Date().getTime(),
    }
    return this.subscribersRepository.createSubscriber(data)
  }

  async deleteSubscriber(email: string): Promise<Subscriber> {
    return this.subscribersRepository.deleteSubscriber(email)
  }
}
