import { inject, injectable } from 'inversify';
import TYPES from '../../../../../../container.types';
import { Product } from '../../domain/Product';
import { ProductRepository } from '../../domain/ProductRepository';

@injectable()
export class ProductUpdate {
    constructor(
        @inject(TYPES.ProductApiClient)
        private readonly productRepository: ProductRepository
    ) { }

    async update(uid: string, product: Partial<Product>): Promise<Product> {
        return await this.productRepository.productUpdate(uid, product)
    }
}