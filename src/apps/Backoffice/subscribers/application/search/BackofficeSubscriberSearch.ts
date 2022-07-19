import { inject, injectable } from 'inversify'
import { BackofficeSubscribersRepository } from '../../domain/BackofficeSubscribersRepository';
import TYPES from '../../../../../../container.types';
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';

@injectable()
export class BackofficeSubscriberSearch {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private repository: BackofficeSubscribersRepository
    ) { }

    async search(email: string): Promise<BackofficeSubscriber> {
        return await this.repository.searchByEmail(email)
    }
}
