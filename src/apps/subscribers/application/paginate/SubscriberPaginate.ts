import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types';
import { SubscribersRepository } from '../../domain/SubscribersRepository';
import { SubscriberPaginate } from '../../domain/Subscriber';

@injectable()
export class SubscribersPaginate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async subscribersPaginate(limit: number, startAfter: number): Promise<SubscriberPaginate> {
        return await this.subscribersRepository.subscribersPaginate(limit, startAfter);
    }
}
