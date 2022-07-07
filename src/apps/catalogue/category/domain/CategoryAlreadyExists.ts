export class CategoryAlreadyExists extends Error {
    constructor() {
        super();
        this.message = "Category already exists"
    }
}