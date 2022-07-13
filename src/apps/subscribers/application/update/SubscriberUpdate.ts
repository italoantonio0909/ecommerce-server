import { inject, injectable } from 'inversify'
import TYPES from '../../../../../container.types';
import { SubscribersRepository } from '../../domain/SubscribersRepository';
import { Subscriber } from '../../domain/Subscriber';


@injectable()
export class SubscriberUpdate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async subscriberUpdate(uid: string, subscriber: Partial<Subscriber>): Promise<Subscriber> {
        const data = {
            ...subscriber!,
            modified_at: new Date().getTime()
        }
        return await this.subscribersRepository.subscriberUpdate(uid, data)
    }
}
