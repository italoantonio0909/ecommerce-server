export class SubscriberAlreadyExists extends Error {
    constructor() {
        super()
        this.message = "Email already in use"
    }
}