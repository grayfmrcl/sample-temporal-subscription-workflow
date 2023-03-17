export class InvalidCustomerError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidCustomerError.prototype);
  }
}