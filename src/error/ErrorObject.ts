export class ErrorObject extends Error {
  public statusCode: number;

  constructor(message: string = 'Something went wrong.', statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ErrorObject.prototype);
  }
}
