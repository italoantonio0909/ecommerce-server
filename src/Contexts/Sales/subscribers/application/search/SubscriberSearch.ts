import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { SubscribersRepository } from '../../domain/SubscribersRepository';
import { Subscriber } from '../../domain/Subscriber';

@injectable()
export class SubscriberSearch {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private repository: SubscribersRepository
    ) { }

    async searchByEmail(email: string): Promise<Subscriber> {
        return await this.repository.searchByEmail(email)
    }
}
