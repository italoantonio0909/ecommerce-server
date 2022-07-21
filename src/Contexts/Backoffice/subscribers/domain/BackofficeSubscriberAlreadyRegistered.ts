export class BackofficeSubscriberAlreadyExists extends Error {
    constructor() {
        super()
        this.message = "Email already in use"
    }
}