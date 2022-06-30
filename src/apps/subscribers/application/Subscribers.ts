import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { SubscribersRepository } from '../domain/SubscribersRepository'
import { Subscriber, SubscriberPaginate } from '../domain/Subscriber';
import { SubscriberAlreadyExists } from '../domain/SubscriberAlreadyRegistered';

@injectable()
export class Subscribers {
  constructor(
    @inject(TYPES.SubscriberApiClient)
    private subscribersRepository: SubscribersRepository
  ) { }

  async subscribersPaginate(limit: number, startAfter: number): Promise<SubscriberPaginate> {
    return await this.subscribersRepository.subscribersPaginate(limit, startAfter);
  }

  async subscriberFilter(email: string): Promise<Array<Subscriber>> {
    return await this.subscribersRepository.subscriberFilter(email)
  }

  async subscriberCreate({ email }: Subscriber): Promise<Subscriber> {

    const subscribers = await this.subscriberFilter(email);

    if (subscribers.length !== 0) {
      throw new SubscriberAlreadyExists()
    }

    const subscriber: Subscriber = {
      email,
      created_at: new Date().getTime(),
      modified_at: new Date().getTime(),
      status: 'active',
    }
    return this.subscribersRepository.subscriberCreate(subscriber)
  }

  async subscriberDelete(id: string): Promise<Subscriber> {
    return this.subscribersRepository.subscriberDelete(id)
  }
}
