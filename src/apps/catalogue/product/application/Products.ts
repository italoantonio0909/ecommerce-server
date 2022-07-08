import { inject, injectable } from 'inversify';
import TYPES from '../../../../../container.types';
import { Product } from '../domain/Product';
import { ProductRepository } from '../domain/ProductRepository';
import {
    ProductTitleRequired,
    ProductClassProductRequired,
    ProductNotMustHaveParent,
    ProductChildMustHaveParent,
    ProductChildNotMustProductClass,
    ProductStructureInvalid
} from '../domain/exceptions';

@injectable()
export class Products {
    constructor(
        @inject(TYPES.CatalogueProductApiClient)
        private readonly productRepository: ProductRepository
    ) { }

    async productCleanStandlone(product: Product) {
        const { title, product_class, parent } = product;
        if (!title) {
            throw new ProductTitleRequired()
        }
        if (!product_class) {
            throw new ProductClassProductRequired()
        }
        if (parent) {
            throw new ProductNotMustHaveParent()
        }
    }

    async productCleanParent(product: Product) {
        this.productCleanStandlone(product)
    }

    async productCleanChild(product: Product) {
        const { parent, product_class } = product;
        if (!parent) {
            throw new ProductChildMustHaveParent();
        }

        if (product_class) {
            throw new ProductChildNotMustProductClass();
        }
    }

    async productValidate(product: Product) {
        /**
        Validate a product. Those are the rules:
        +---------------+-------------+--------------+--------------+
        |               | stand alone | parent       | child        |
        +---------------+-------------+--------------+--------------+
        | title         | required    | required     | optional     |
        +---------------+-------------+--------------+--------------+
        | product class | required    | required     | must be None |
        +---------------+-------------+--------------+--------------+
        | parent        | forbidden   | forbidden    | required     |
        +---------------+-------------+--------------+--------------+
        | stockrecords  | 0 or more   | forbidden    | 0 or more    |
        +---------------+-------------+--------------+--------------+
        | categories    | 1 or more   | 1 or more    | forbidden    |
        +---------------+-------------+--------------+--------------+
        | attributes    | optional    | optional     | optional     |
        +---------------+-------------+--------------+--------------+
        | rec. products | optional    | optional     | unsupported  |
        +---------------+-------------+--------------+--------------+
        | options       | optional    | optional     | forbidden    |
        +---------------+-------------+--------------+--------------+
        Because the validation logic is quite complex, validation is delegated
        to the sub method appropriate for the product's structure.
        */
        const structure = ["standalone", "parent", "child"]
        const isValidStruct = String(product.structure) in structure
        if (!isValidStruct) {
            throw new ProductStructureInvalid();
        }

        if (product.structure === "child") {
            await this.productCleanChild(product)
        }

        if (product.structure === "parent") {
            await this.productCleanParent(product)
        }

        if (product.structure === "standalone") {
            await this.productCleanStandlone(product)
        }
    }

    async productCreate(product: Product): Promise<Product> {

        await this.productValidate(product)

        const data: Product = {
            ...product,
            created_at: new Date().getTime(),
        }
        return await this.productRepository.productCreate(data)
    }

    async productDetail(uid: string): Promise<Product> {
        return await this.productRepository.productDetail(uid)
    }

    async productPaginate(limit: number, startAfter: number): Promise<{ products: Array<Product>, startAfter: number }> {
        return await this.productRepository.productPaginate(limit, startAfter)
    }

    async productUpdate(uid: string, product: Partial<Product>): Promise<Product> {
        return await this.productRepository.productUpdate(uid, product)
    }
}