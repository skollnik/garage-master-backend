import { Injectable } from '@nestjs/common';
import { IServiceTypeRepository } from 'src/domain/service-type/interfaces/service-type.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ServiceTypeMapperFactory } from '../factories/service-type-mapper.factory';
import { ServiceType } from 'src/domain/service-type/model/service-type';

@Injectable()
export class ServiceTypeRepository implements IServiceTypeRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceTypeMapperFactory: ServiceTypeMapperFactory,
  ) {}

  async create({ category, duration }: ServiceType): Promise<ServiceType> {
    const saved = await this.prisma.serviceTypeEntity.create({
      data: { category, duration },
    });

    return this.serviceTypeMapperFactory.fromEntity(saved);
  }

  async findAll(): Promise<ServiceType[]> {
    const serviceTypes = await this.prisma.serviceTypeEntity.findMany({});

    return serviceTypes.map((serviceType) =>
      this.serviceTypeMapperFactory.fromEntity(serviceType),
    );
  }

  async findById(id: number): Promise<ServiceType> {
    const serviceTypeEntity = await this.prisma.serviceTypeEntity.findUnique({
      where: { id },
    });
    if (!serviceTypeEntity) return null;

    return this.serviceTypeMapperFactory.fromEntity(serviceTypeEntity);
  }

  async delete(id: number): Promise<void> {
    const serviceType = await this.prisma.serviceTypeEntity.delete({
      where: { id },
    });
  }
}
