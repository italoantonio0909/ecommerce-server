import { inject, injectable } from 'inversify'
import { BackofficeSubscribersRepository } from '../../domain/BackofficeSubscribersRepository';
import TYPES from '../../../../../../container.types';

@injectable()
export class BackofficeSubscriberTotal {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private repository: BackofficeSubscribersRepository
    ) { }

    async total(): Promise<{ subscribersTotal: number }> {
        return await this.repository.total()
    }
}
