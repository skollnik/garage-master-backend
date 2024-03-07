import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from 'src/application/shared/base.exception';
import { AppointmentAlreadyTakenException } from 'src/domain/appointment/exceptions/appointment-already-taken.exception';
import { AppointmentNotFoundException } from 'src/domain/appointment/exceptions/appointment-not-found.exception';
import { EmailAlreadyTakenException } from 'src/domain/auth/exceptions/email-already-taken.exception';
import { InvalidCredentialsException } from 'src/domain/auth/exceptions/invalid-credentials.exception';

@Catch(BaseException)
export class DomainErrorFilter implements ExceptionFilter<BaseException> {
  catch(exception: BaseException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const resp = context.getResponse<Response>();
    const message = exception.message;

    if (exception instanceof EmailAlreadyTakenException)
      return this.sendErrorResponse(resp, HttpStatus.CONFLICT, message);

    if (exception instanceof InvalidCredentialsException)
      return this.sendErrorResponse(resp, HttpStatus.UNAUTHORIZED, message);

    if (exception instanceof AppointmentAlreadyTakenException)
      return this.sendErrorResponse(resp, HttpStatus.CONFLICT, message);

    if (exception instanceof AppointmentNotFoundException)
      return this.sendErrorResponse(resp, HttpStatus.NOT_FOUND, message);
  }

  private sendErrorResponse(resp: Response, status: number, message: string) {
    return resp.status(status).send({ status, message });
  }
}
