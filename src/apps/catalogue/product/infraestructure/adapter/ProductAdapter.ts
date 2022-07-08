import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { Product } from '../../domain/Product';
import { ProductUserInterface } from '../ui/ProductUserInterface';
import { Products } from '../../application/Products';

@injectable()
export class Productdapter {
    constructor(
        @inject(TYPES.CatalogueProductUserInterface)
        private productUserInterface: ProductUserInterface,
        @inject(TYPES.CatalogueProduct) private product: Products
    ) { }

    init() {
        this.productUserInterface.installProductPaginate((limit: number, startAfter: number) =>
            this.product.productPaginate(limit, startAfter)
        )
        this.productUserInterface.installProductCreate(
            (product: Product) => this.product.productCreate(product)
        )
        this.productUserInterface.installProductDetail((uid: string) => this.product.productDetail(uid))
        this.productUserInterface.installProductUpdate((uid: string, product: Partial<Product>) => this.product.productUpdate(uid, product))
    }
}