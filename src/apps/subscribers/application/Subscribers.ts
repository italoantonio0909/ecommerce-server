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

  async subscriberSearch(email: string): Promise<Subscriber> {
    return await this.subscribersRepository.subscriberSearch(email)
  }

  async subscriberCreate({ email }: Subscriber): Promise<Subscriber> {

    const subscribers = await this.subscriberSearch(email);

    if (subscribers !== null) {
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
