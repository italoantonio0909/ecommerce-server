import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { Product } from '../../domain/Product';
import { ProductUserInterface } from '../ui/ProductUserInterface';
import { ProductCreate } from '../../application/create/ProductCreate';
import { ProductsPaginate } from '../../application/paginate/ProductPaginate';
import { ProductDetail } from '../../application/detail/ProductDetail';
import { ProductUpdate } from '../../application/update/Products';

@injectable()
export class Productdapter {
    constructor(
        @inject(TYPES.ProductUserInterface)
        private productUserInterface: ProductUserInterface,
        @inject(TYPES.ProductCreate) private productCreate: ProductCreate,
        @inject(TYPES.ProductCreate) private productDetail: ProductDetail,
        @inject(TYPES.ProductPaginate) private productPaginate: ProductsPaginate,
        @inject(TYPES.ProductUpdate) private productUpdate: ProductUpdate
    ) { }

    init() {
        this.productUserInterface.installProductPaginate((limit: number, startAfter: number) =>
            this.productPaginate.paginate(limit, startAfter)
        )
        this.productUserInterface.installProductCreate(
            (product: Product) => this.productCreate.create(product)
        )
        this.productUserInterface.installProductDetail((uid: string) => this.productDetail.detail(uid))
        this.productUserInterface.installProductUpdate((uid: string, product: Partial<Product>) => this.productUpdate.update(uid, product))
    }
}