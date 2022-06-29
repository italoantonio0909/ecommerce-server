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

  async subscribersAll(limit: number): Promise<Array<Subscriber>> {
    const subscribers = await this.subscribersRepository.subscribersAll(limit)
    return subscribers.filter(({ status }) => status === 'active')
  }

  async subscriberCreate({ email }: Subscriber): Promise<Subscriber> {
    const subscriber: Subscriber = {
      email,
      created_at: new Date().getTime(),
      modified_at: new Date().getTime(),
      status: 'active',
    }
    return this.subscribersRepository.subscriberCreate(subscriber)
  }

  async subscriberDelete(email: string): Promise<Subscriber> {
    return this.subscribersRepository.subscriberDelete(email)
  }
}
