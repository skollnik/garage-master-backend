export class ContactEvent {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly message: string,
  ) {}
}
