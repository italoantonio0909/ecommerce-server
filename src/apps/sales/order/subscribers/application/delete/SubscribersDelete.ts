import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../../container.types';
import { SubscribersRepository } from '../../domain/SubscribersRepository';
import { Subscriber } from '../../domain/Subscriber';

@injectable()
export class SubscriberDelete {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async delete(uid: string): Promise<Subscriber> {
        return await this.subscribersRepository.subscriberUpdate(uid, {})
    }
}
