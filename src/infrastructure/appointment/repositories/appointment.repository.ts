import { Injectable } from '@nestjs/common';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment.interface';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { AppointmentMapperFactory } from '../factories/appointment-mapper.factory';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';

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
    email,
    startDate,
    endDate,
    status,
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
        email,
        startDate,
        endDate,
        status,
        additionalInfo,
      },
      include: {
        car: true,
        serviceType: true,
      },
    });

    return this.appointmentMapperFactory.fromEntity(saved);
  }

  async update({ id, status }: Appointment): Promise<Appointment> {
    const updated = await this.prisma.appointmentEntity.update({
      where: { id },
      data: {
        status: AppointmentStatus[status],
      },
      include: {
        car: true,
        serviceType: true,
      },
    });

    return this.appointmentMapperFactory.fromEntity(updated);
  }

  async findById(id: number): Promise<Appointment> {
    const appointment = await this.prisma.appointmentEntity.findUnique({
      where: { id },
      include: { car: true, serviceType: true },
    });

    return this.appointmentMapperFactory.fromEntity(appointment);
  }

  async checkAvailability(startDate: Date, endDate: Date): Promise<boolean> {
    const overlappingAppointments =
      await this.prisma.appointmentEntity.findMany({
        where: {
          status: 'CONFIRMED',
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

  async getAppointmentsForDay(date: Date): Promise<Appointment[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointmentsForDay = await this.prisma.appointmentEntity.findMany({
      where: {
        AND: [
          { startDate: { gte: startOfDay } },
          { endDate: { lte: endOfDay } },
        ],
      },
      include: { car: true, serviceType: true },
      orderBy: { startDate: 'asc' },
    });

    return appointmentsForDay.map((appointment) =>
      this.appointmentMapperFactory.fromEntity(appointment),
    );
  }
}
