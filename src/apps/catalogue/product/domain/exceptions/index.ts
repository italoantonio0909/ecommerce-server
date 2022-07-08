export class ProductTitleRequired extends Error {
    constructor() {
        super();
        this.message = "Product must have a title"
    }
}

export class ProductProductClassRequired extends Error {
    constructor() {
        super();
        this.message = "Product must have a product class"
    }
}

export class ProductShouldNotHaveParent extends Error {
    constructor() {
        super();
        this.message = "Only products child must have a parent"
    }
}

export class ProductChildShouldHaveParent extends Error {
    constructor() {
        super();
        this.message = "Product child must have a parent"
    }
}

export class ProductChildNotMustProductClass extends Error {
    constructor() {
        super();
        this.message = "Product child not must have a product class"
    }
}

export class ProductStructureShouldValid extends Error {
    constructor() {
        super();
        this.message = "Product structure invalid"
    }
}

export class ProductChildShouldNotHaveParent extends Error {
    constructor() {
        super();
        this.message = "You can only assign child products to parent products."
    }
}

export class ProductChildShouldNotHaveCategory extends Error {
    constructor() {
        super();
        this.message = "You can only assign categories to parent products."
    }
}
