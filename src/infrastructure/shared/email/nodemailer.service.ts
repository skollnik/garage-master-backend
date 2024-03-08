import { Injectable } from '@nestjs/common';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USER,
} from './email.constants';
import { SendEmailDto } from './dtos/send-email.dto';

@Injectable()
export class NodemailerService implements IEmailService {
  private host: string;
  private port: number;
  private user: string;
  private password: string;
  constructor(private readonly configService: ConfigService) {
    this.host = configService.get(EMAIL_HOST);
    this.port = configService.get(EMAIL_PORT);
    this.user = configService.get(EMAIL_USER);
    this.password = configService.get(EMAIL_PASSWORD);
  }

  private mailTransporter() {
    const transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false,
      auth: {
        user: this.user,
        pass: this.password,
      },
    });

    return transporter;
  }

  async newContactMail(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    message: string,
  ) {
    this.sendEmail({
      from: this.user,
      to: email,
      subject: 'New contact',
      html: `<h1>New contact</h1>
      <p>First name: ${firstName}</p>
      <p>Last name: ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Phone number: ${phoneNumber}</p>
      <p>Message: ${message}</p>`,
    });
  }

  async newAppointmentMail(
    firstName: string,
    lastName: string,
    car: string,
    email: string,
    serviceType: string,
    additionalInfo: string,
    date: string,
  ) {
    this.sendEmail({
      from: email,
      to: this.user,
      subject: 'New appointment',
      html: `<h1>New appointment</h1>
      <p>First name: ${firstName}</p>
      <p>Last name: ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Car: ${car}</p>
      <p>Service type: ${serviceType}</p>
      <p>Additional info: ${additionalInfo}</p>
      <p>Date: ${date}</p>`,
    });
  }

  async appointmentConfirmedMail(email: string) {
    this.sendEmail({
      from: this.user,
      to: email,
      subject: 'Appointment confirmed',
      html: `<h1>Your appointment has been confirmed</h1>
      <p>Your appointment has been confirmed. We are waiting for you on the date you have chosen.`,
    });
  }

  async appointmentCanceledMail(email: string) {
    this.sendEmail({
      from: this.user,
      to: email,
      subject: 'Appointment canceled',
      html: `<h1>Your appointment has been canceled</h1>
      <p>Your appointment has been canceled. If you have any questions, feel free to contact us.`,
    });
  }

  async sendEmail({ from, to, subject, html }: SendEmailDto) {
    const transporter = this.mailTransporter();

    const options = {
      from: from || this.user,
      to: to,
      subject: subject,
      html: html,
    };

    try {
      const result = await transporter.sendMail(options);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
