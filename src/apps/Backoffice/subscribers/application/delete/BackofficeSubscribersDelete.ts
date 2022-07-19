import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { BackofficeSubscribersRepository } from '../../domain/BackofficeSubscribersRepository';
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';

@injectable()
export class BackofficeSubscriberDelete {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private repository: BackofficeSubscribersRepository
    ) { }

    async delete(uid: string): Promise<BackofficeSubscriber> {
        return await this.repository.delete(uid)
    }
}
