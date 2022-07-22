import { inject, injectable } from 'inversify'
import { SubscriberAlreadyExists } from '../../domain/SubscriberAlreadyRegistered';
import TYPES from '../../../../../../container.types';
import { Subscriber } from '../../domain/Subscriber';
import { SubscribersRepository } from '../../domain/SubscribersRepository';

@injectable()
export class SubscriberCreate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async create({ email }: Subscriber): Promise<Subscriber> {

        const subscriber = await this.subscribersRepository.searchByEmail(email);
        if (subscriber !== null) {
            throw new SubscriberAlreadyExists()
        }

        const data: Subscriber = {
            email,
            created_at: new Date().getTime(),
            modified_at: new Date().getTime(),
            status: "active",
        }
        return this.subscribersRepository.create(data);
    }
}
