import { Injectable } from '@nestjs/common';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment.interface';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { AppointmentMapperFactory } from '../factories/appointment-mapper.factory';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appointmentMapperFactory: AppointmentMapperFactory,
  ) {}

  async create({
    firstName,
    lastName,
    car,
    serviceType,
    startDate,
    endDate,
    additionalInfo,
  }: Appointment): Promise<Appointment> {
    const saved = await this.prisma.appointmentEntity.create({
      data: {
        firstName,
        lastName,
        car: {
          create: { model: car.model },
        },
        serviceType: {
          connect: { id: serviceType.id },
        },
        startDate,
        endDate,
        additionalInfo,
      },
      include: {
        car: true,
        serviceType: true,
      },
    });

    return this.appointmentMapperFactory.fromEntity(saved);
  }

  async checkAvailability(startDate: Date, endDate: Date): Promise<boolean> {
    const overlappingAppointments =
      await this.prisma.appointmentEntity.findMany({
        where: {
          OR: [
            {
              AND: [
                { startDate: { lte: endDate } },
                { endDate: { gte: startDate } },
              ],
            },
            {
              AND: [
                { startDate: { gte: startDate } },
                { startDate: { lte: endDate } },
              ],
            },
          ],
        },
      });

    return overlappingAppointments.length === 0;
  }

  async getAppointmentsForDay(date: Date | any): Promise<Appointment[]> {
    const startOfDay = new Date(date.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date.date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointmentsForDay = await this.prisma.appointmentEntity.findMany({
      where: {
        AND: [
          { startDate: { gte: startOfDay } },
          { endDate: { lte: endOfDay } },
        ],
      },
      include: { car: true, serviceType: true },
    });

    return appointmentsForDay.map((appointment) =>
      this.appointmentMapperFactory.fromEntity(appointment),
    );
  }
}
