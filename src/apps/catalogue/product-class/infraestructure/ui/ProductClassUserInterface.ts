import { ProductClass, ProductClassPaginate } from '../../domain/ProductClass';

export interface ProductClassUserInterface {
    installProductClassCreate(callback: (productClass: ProductClass) => Promise<ProductClass>): void

    installProductClassUpdate(callback: (uid: string, productClass: Partial<ProductClass>) => Promise<ProductClass>): void

    installProductClassPaginate(callback: (limit: number, startAfter: number) => Promise<ProductClassPaginate>): void

    installProductClassGet(callback: (limit: number) => Promise<Array<ProductClass>>): void
}