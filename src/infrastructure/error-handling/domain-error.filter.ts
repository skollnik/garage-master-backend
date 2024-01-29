import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from 'src/application/shared/base.exception';
import { EmailAlreadyTakenException } from 'src/domain/auth/exceptions/email-already-taken.exception';

@Catch(BaseException)
export class DomainErrorFilter implements ExceptionFilter<BaseException> {
  catch(exception: BaseException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const resp = context.getResponse<Response>();
    const message = exception.message;

    if (exception instanceof EmailAlreadyTakenException)
      return this.sendErrorResponse(resp, HttpStatus.CONFLICT, message);
  }

  private sendErrorResponse(resp: Response, status: number, message: string) {
    return resp.status(status).send({ status, message });
  }
}
