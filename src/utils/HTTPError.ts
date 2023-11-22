// This is the error type to use for ALL endpoint errors; errors are automatically caught and handled by middleware
export default class HTTPError extends Error {
  status: number

  constructor (message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'HTTPError'
  }
}
