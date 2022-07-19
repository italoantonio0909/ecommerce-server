import { inject, injectable } from 'inversify';
import TYPES from '../../../../../../container.types';
import { ProductRepository } from '../../domain/ProductRepository';
import { ProductPaginate } from '../../domain/Product';
;

@injectable()
export class ProductsPaginate {
    constructor(
        @inject(TYPES.ProductApiClient)
        private readonly productRepository: ProductRepository
    ) { }

    async paginate(limit: number, startAfter: number): Promise<ProductPaginate> {
        return await this.productRepository.productPaginate(limit, startAfter)
    }
}