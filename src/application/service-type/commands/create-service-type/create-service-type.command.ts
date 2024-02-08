export class CreateServiceTypeCommand {
  constructor(
    public readonly category: string,
    public readonly duration: number,
  ) {}
}
