import { inject, injectable } from "inversify";
import TYPES from '../../../../../../container.types';
import { ProductClasses } from '../../application/ProductClasses';
import { ProductClassUserInterface } from '../ui/ProductClassUserInterface';
import { ProductClass } from '../../domain/ProductClass';

@injectable()
export class ProductClassAdapter {
    constructor(
        @inject(TYPES.CatalogueProductClass) private productClasses: ProductClasses,
        @inject(TYPES.CatalogueProductClassUserInterface) private productClassUserInterface: ProductClassUserInterface
    ) { }

    init() {
        this.productClassUserInterface.installProductClassCreate(
            (productClass: ProductClass) => this.productClasses.productClassCreate(productClass)
        )
        this.productClassUserInterface.installProductClassUpdate(
            (uid: string, productClass: Partial<ProductClass>) => this.productClasses.productClassUpdate(uid, productClass)
        )
        this.productClassUserInterface.installProductClassPaginate(
            (limit: number, startAfter: number) => this.productClasses.productClassPaginate(limit, startAfter)
        )
        this.productClassUserInterface.installProductClassGet(
            (limit: number) => this.productClasses.productClassGet(limit)
        )
    }
}