import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IServiceTypeRepository } from 'src/domain/service-type/interfaces/service-type.interface';
import { ServiceType } from 'src/domain/service-type/model/service-type';
import { SERVICE_TYPE_REPOSITORY } from '../../service-type.constants';
import { DeleteServiceTypeCommand } from './delete-service-type.command';

@CommandHandler(DeleteServiceTypeCommand)
export class DeleteServiceTypeCommandHandler
  implements ICommandHandler<DeleteServiceTypeCommand>
{
  constructor(
    @Inject(SERVICE_TYPE_REPOSITORY)
    private readonly serviceTypeRepository: IServiceTypeRepository,
  ) {}

  async execute({ id }: DeleteServiceTypeCommand): Promise<void> {
    const serviceType = await this.serviceTypeRepository.findById(id);
    ServiceType.throwIfNull(serviceType);
    await this.serviceTypeRepository.delete(id);
  }
}
