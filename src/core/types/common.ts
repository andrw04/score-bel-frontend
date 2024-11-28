export type PageResponseType<T> = {
    pagination: {
        count: number
        next: string
        previous: string
    }
    results: Array<T>
}