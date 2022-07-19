import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { BackofficeSubscribersRepository } from '../../domain/BackofficeSubscribersRepository';
import { BackofficeSubscriber } from '../../domain/BackofficeSubscriber';
import { Paginate } from '../../../../Shared/pagination/domain/Paginate';

@injectable()
export class BackOfficeSubscribersPaginate {
    constructor(
        @inject(TYPES.SubscriberApiClient)
        private repository: BackofficeSubscribersRepository
    ) { }

    async paginate(limitOfDocuments: number, page: number): Promise<Paginate<BackofficeSubscriber>> {
        return await this.repository.paginate(limitOfDocuments, page);
    }
}
