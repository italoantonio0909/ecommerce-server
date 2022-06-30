import { inject } from 'inversify';
import TYPES from '../../../../../container.types';
import { Product } from '../domain/Product';
import { ProductRepository } from '../domain/ProductRepository';

export class ProductUseCases {
    constructor(
        @inject(TYPES.CatalogueProductApiClient) private readonly productRepository: ProductRepository
    ) { }

    async productCreate(product: Product): Promise<Product> {
        const data: Product = {
            ...product,
            created_at: new Date().getTime()
        }
        return await this.productRepository.productCreate(data)
    }

    async productDetail(id: string): Promise<Product> {
        return await this.productRepository.productDetail(id)
    }

    async productPaginate(limit: number, startAfter: number): Promise<{ products: Array<Product>, startAfter: number }> {
        return await this.productRepository.productPaginate(limit, startAfter)
    }
}