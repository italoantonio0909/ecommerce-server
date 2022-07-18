import { inject, injectable } from 'inversify'
import { SubscribersRepository } from '../../domain/SubscribersRepository';
import TYPES from '../../../../../container.types';

@injectable()
export class SubscriberTotal {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async total(): Promise<{ subscribersTotal: number }> {
        return await this.subscribersRepository.subscribersTotal()
    }
}
