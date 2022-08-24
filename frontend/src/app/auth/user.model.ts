export class User {
  constructor(
    private username: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get expireDate() {
    return this.expirationDate;
  }

  get userToken() {
    return this.token;
  }
}
