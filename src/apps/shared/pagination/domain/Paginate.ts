import { Type as T } from "typescript";

export type Paginate = {
    limit: number,
    count: number,
    next: number,
    previous: number,
    results: Array<T>
}