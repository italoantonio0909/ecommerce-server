import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { SubscribersRepository } from '../../domain/SubscribersRepository';
import { Paginate } from '../../../../shared/pagination/domain/Paginate';
import { Subscriber } from '../../domain/Subscriber';

@injectable()
export class SubscribersPaginate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private subscribersRepository: SubscribersRepository
    ) { }

    async paginate(limitOfDocuments: number, page: number): Promise<Paginate<Subscriber>> {
        return await this.subscribersRepository.subscribersPaginate(limitOfDocuments, page);
    }
}
