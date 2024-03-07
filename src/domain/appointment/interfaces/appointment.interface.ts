import { Appointment } from '../model/appointment';

export type DateData = {
  date: Date;
};

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  update(appointment: Appointment): Promise<Appointment>;
  findById(id: number): Promise<Appointment>;
  checkAvailability(startDate: Date, endDate: Date): Promise<boolean>;
  getAppointmentsForDay(date: Date): Promise<Appointment[]>;
}
