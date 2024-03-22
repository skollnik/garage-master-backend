import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateServiceTypeCommand } from './create-service-type.command';
import { ServiceType } from 'src/domain/service-type/model/service-type';
import { Inject } from '@nestjs/common';
import { SERVICE_TYPE_REPOSITORY } from '../../service-type.constants';
import { IServiceTypeRepository } from 'src/domain/service-type/interfaces/service-type.interface';

@CommandHandler(CreateServiceTypeCommand)
export class CreateServiceTypeCommandHandler
  implements ICommandHandler<CreateServiceTypeCommand>
{
  constructor(
    @Inject(SERVICE_TYPE_REPOSITORY)
    private readonly serviceTypeRepository: IServiceTypeRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    category,
    duration,
  }: CreateServiceTypeCommand): Promise<ServiceType> {
    const serviceType = ServiceType.create({ category, duration });
    const createdServiceType = this.eventPublisher.mergeObjectContext(
      await this.serviceTypeRepository.create(serviceType),
    );

    return createdServiceType;
  }
}
