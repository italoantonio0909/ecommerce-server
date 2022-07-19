import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { BackofficeSubscribersRepository } from '../../domain/BackofficeSubscribersRepository';
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';

@injectable()
export class SubscriberUpdate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private repository: BackofficeSubscribersRepository
    ) { }

    async update(uid: string, subscriber: Partial<BackofficeSubscriber>): Promise<BackofficeSubscriber> {
        const data = {
            ...subscriber!,
            modified_at: new Date().getTime()
        }
        return await this.repository.update(uid, data)
    }
}
