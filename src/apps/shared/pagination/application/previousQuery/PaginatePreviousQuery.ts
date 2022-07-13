import { injectable, inject } from 'inversify';
import { PaginateRepository } from '../../domain/PaginateRepository';

@injectable()
export class PaginatePreviousQuery {
    constructor(
        @inject("") private paginateRepository: PaginateRepository
    ) { }

    async previousQuery(first: number, limit: number): Promise<number> {
        return await this.paginateRepository.paginatePreviuosQuery(first, limit)
    }
}