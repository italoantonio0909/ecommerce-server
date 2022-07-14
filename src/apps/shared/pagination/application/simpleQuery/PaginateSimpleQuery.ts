import { injectable, inject } from 'inversify';
import { Type as T } from 'typescript';
import { PaginateRepository } from '../../domain/PaginateRepository';

@injectable()
export class PaginateSimpleQuery {
    constructor(
        @inject("") private paginateRepository: PaginateRepository
    ) { }

    async simpleQUery(limit: number): Promise<Array<T>> {
        return await this.paginateRepository.paginateSimpleQuery(limit)
    }
}