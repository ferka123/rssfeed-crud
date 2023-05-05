export default class CustomError extends Error {
  constructor(public errorMessage: string = 'Internal error', public statusCode: number = 500) {
    super();
  }

  public response = () => {
    return { status: 'error', message: this.errorMessage };
  };
}
