import { injectable, inject } from 'inversify';
import { Type as T } from 'typescript';
import { PaginateRepository } from '../../domain/PaginateRepository';

@injectable()
export class PaginateQuery {
    constructor(
        @inject("PaginateWebApiClient") private paginateRepository: PaginateRepository
    ) { }

    async paginateQuery(limit: number, startAfter: number): Promise<Array<T>> {
        return await this.paginateRepository.paginatePaginateQuery(limit, startAfter)
    }
}