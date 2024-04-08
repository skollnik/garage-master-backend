export interface IEmailService {
  newContactMail(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    message: string,
  );
  newAppointmentMail(
    firstName: string,
    lastName: string,
    car: string,
    email: string,
    serviceType: string,
    additionalInfo: string,
    date: Date,
  );
  appointmentConfirmedMail(email: string);
  appointmentCanceledMail(email: string);
}
