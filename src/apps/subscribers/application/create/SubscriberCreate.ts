import { inject, injectable } from 'inversify'
import { SubscriberAlreadyExists } from '../../domain/SubscriberAlreadyRegistered';
import TYPES from '../../../../../container.types';
import { Subscriber } from '../../domain/Subscriber';
import { SubscribersRepository } from '../../domain/SubscribersRepository';

@injectable()
export class SubscriberCreate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async subscriberCreate({ email }: Subscriber): Promise<Subscriber> {

        const subscribers = await this.subscribersRepository.subscriberSearch(email);

        if (subscribers !== null) {
            throw new SubscriberAlreadyExists()
        }

        const subscriber: Subscriber = {
            email,
            created_at: new Date().getTime(),
            modified_at: new Date().getTime(),
            status: "active",
        }
        return this.subscribersRepository.subscriberCreate(subscriber)
    }
}
