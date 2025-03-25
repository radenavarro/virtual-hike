export class SubscriptionError extends Error {
    constructor (message:string) {
        super(message)
        this.name = 'SubscriptionError'
    }
}

export class ImageError extends Error {
    constructor (message:string) {
        super(message)
        this.name = 'ImageError'
    }
}

export class CalculationError extends Error {
    constructor (message:string) {
        super(message)
        this.name = 'CalculationError'
    }
}

export class DateError extends Error {
    constructor (message:string) {
        super(message)
        this.name = 'DateError'
    }
}