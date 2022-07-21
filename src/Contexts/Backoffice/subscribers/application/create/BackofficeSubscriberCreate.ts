import { inject, injectable } from 'inversify'
import { BackofficeSubscriberAlreadyExists } from '../../domain/BackofficeSubscriberAlreadyRegistered';
import TYPES from '../../../../../../container.types';
import { BackofficeSubscribersRepository } from '../../domain/BackofficeSubscribersRepository';
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';

@injectable()
export class BackOfficeSubscriberCreate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private repository: BackofficeSubscribersRepository
    ) { }

    async create({ email }: BackofficeSubscriber): Promise<BackofficeSubscriber> {

        const subscribers = await this.repository.searchByEmail(email);

        if (subscribers !== null) {
            throw new BackofficeSubscriberAlreadyExists()
        }

        const subscriber: BackofficeSubscriber = {
            email,
            created_at: new Date().getTime(),
            modified_at: new Date().getTime(),
            status: "active",
        }
        return this.repository.create(subscriber)
    }
}
