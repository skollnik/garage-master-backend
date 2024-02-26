import { Appointment } from '../model/appointment';

export type DateData = {
  date: Date;
};

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  checkAvailability(startDate: Date, endDate: Date): Promise<boolean>;
  getAppointmentsForDay(date: Date): Promise<Appointment[]>;
}
