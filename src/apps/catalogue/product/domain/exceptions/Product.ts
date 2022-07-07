export class ProductTitleRequired extends Error {
    constructor() {
        super();
        this.message = "Product must have a title"
    }
}

export class ProductClassProductRequired extends Error {
    constructor() {
        super();
        this.message = "Product must have a product class"
    }
}

export class ProductNotMustHaveParent extends Error {
    constructor() {
        super();
        this.message = "Only products child must have a parent"
    }
}

export class ProductChildMustHaveParent extends Error {
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

export class ProductStructureInvalid extends Error {
    constructor() {
        super();
        this.message = "Product structure invalid"
    }
}