import { Type as T } from "typescript";

export interface PaginateRepository {
    paginateSimpleQuery(limit: number): Promise<Array<T>>;

    paginatePaginateQuery(limit: number, startAfter: number): Promise<Array<T>>;

    paginatePreviuosQuery(first: number, limit: number): Promise<number>;
}