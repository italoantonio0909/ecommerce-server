import { inject, injectable } from "inversify";
import TYPES from '../../../../../container.types';
import { ProductClassRepository } from '../domain/ProductClassRepository';
import { ProductClassPaginate, ProductClass } from '../domain/ProductClass';

@injectable()
export class ProductClasses {
    constructor(
        @inject(TYPES.CatalogueProductClassApiClient) private productClassRepository: ProductClassRepository
    ) { }

    async productClassPaginate(limit: number, startAfter: number): Promise<ProductClassPaginate> {
        return await this.productClassRepository.productClassPaginate(limit, startAfter);
    }

    async productClassGet(limit: number): Promise<Array<ProductClass>> {
        return await this.productClassRepository.productClassGet(limit);
    }

    async productClassCreate(productClass: ProductClass) {
        return await this.productClassRepository.productClassCreate(productClass)
    }

    async productClassUpdate(uid: string, productClass: Partial<ProductClass>): Promise<ProductClass> {
        return await this.productClassRepository.productClassUpdate(uid, productClass)
    }
}