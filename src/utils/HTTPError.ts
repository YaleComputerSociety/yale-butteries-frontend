export default class HTTPError extends Error {
  status: number

  constructor (message: string, status: number) {
    super(message) // Call the constructor of the parent class (Error)
    this.status = status
    this.name = 'CustomError'
  }
}
