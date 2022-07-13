import { inject, injectable } from 'inversify';
import TYPES from '../../../../../../container.types';
import { Product } from '../../domain/Product';
import { ProductRepository } from '../../domain/ProductRepository';

@injectable()
export class ProductDetail {
    constructor(
        @inject(TYPES.ProductApiClient)
        private readonly productRepository: ProductRepository
    ) { }

    async detail(uid: string): Promise<Product> {
        return await this.productRepository.productDetail(uid)
    }
}