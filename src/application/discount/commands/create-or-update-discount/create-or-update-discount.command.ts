export class CreateOrUpdateDiscountCommand {
  constructor(
    public readonly text: string,
    public readonly isActive: boolean,
  ) {}
}
