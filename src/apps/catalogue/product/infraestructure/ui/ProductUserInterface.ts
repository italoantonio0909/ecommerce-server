import { Product, ProductPaginate } from '../../domain/Product';

export interface ProductUserInterface {
    installProductCreate(callback: (product: Product) => Promise<Product>): void

    installProductPaginate(callback: (limit: number, startAfter: number) => Promise<ProductPaginate>): void

    installProductDetail(callback: (uid: string) => Promise<Product>): void

}
