import { inject, injectable } from 'inversify'
import { SubscribersRepository } from '../../domain/SubscribersRepository';
import TYPES from '../../../../../container.types';
import { Subscriber } from '../../domain/Subscriber';

@injectable()
export class SubscriberSearch {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async subscriberSearch(email: string): Promise<Subscriber> {
        return await this.subscribersRepository.subscriberSearch(email)
    }
}
