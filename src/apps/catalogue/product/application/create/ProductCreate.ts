import { inject, injectable } from 'inversify';
import TYPES from '../../../../../../container.types';
import { Product } from '../../domain/Product';
import { ProductRepository } from '../../domain/ProductRepository';
import { ProductTitleRequired, ProductProductClassRequired, ProductShouldNotHaveParent, ProductChildShouldHaveParent, ProductChildNotMustProductClass, ProductChildShouldNotHaveCategory, ProductStructureShouldValid } from '../../domain/exceptions/index';

@injectable()
export class ProductCreate {
    constructor(
        @inject(TYPES.ProductApiClient)
        private readonly productRepository: ProductRepository
    ) { }

    async productCleanStandlone(product: Product) {
        const { title, product_class, parent } = product;
        if (!title) {
            throw new ProductTitleRequired()
        }
        if (!product_class) {
            throw new ProductProductClassRequired()
        }
        if (parent) {
            throw new ProductShouldNotHaveParent()
        }
    }

    async productCleanParent(product: Product) {
        await this.productCleanStandlone(product)
    }

    async productCleanChild(product: Product) {
        const { parent, product_class } = product;
        if (!parent) {
            throw new ProductChildShouldHaveParent();
        }

        if (product_class) {
            throw new ProductChildNotMustProductClass();
        }

        if (parent && parent.structure !== "parent") {
            throw new ProductChildShouldHaveParent();
        }

        if (product.categories && product.categories.length !== 0) {
            throw new ProductChildShouldNotHaveCategory();
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
        const validStruct = structure.includes(product.structure)

        if (!validStruct) {
            throw new ProductStructureShouldValid();
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

    async create(product: Product): Promise<Product> {

        await this.productValidate(product)

        const data: Product = {
            ...product,
            created_at: new Date().getTime(),
        }
        return await this.productRepository.productCreate(data)
    }
}