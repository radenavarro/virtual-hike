class SubscriptionError extends Error {
    constructor (message:string) {
        super(message)
        this.name = 'Subscription_Error'
    }
}