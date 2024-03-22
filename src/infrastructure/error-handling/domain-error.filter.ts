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
import { FolderAlreadyExistsException } from 'src/domain/gallery/exceptions/folder-already-exists.exception';
import { FolderIsNotEmptyException } from 'src/domain/gallery/exceptions/folder-is-not-empty.exception';
import { FolderNotFoundException } from 'src/domain/gallery/exceptions/folder-not-found.exceptionts';
import { ImagesNotUploadedException } from 'src/domain/gallery/exceptions/images-not-uploaded.exception';
import { InvalidFileTypeException } from 'src/domain/gallery/exceptions/invalid-file-type.exception';
import { MediaNotFoundException } from 'src/domain/gallery/exceptions/media-not-found.exception';
import { VideoNotUploadedException } from 'src/domain/gallery/exceptions/video-not-uploaded.exception';
import { ServiceTypeNotFoundException } from 'src/domain/service-type/exceptions/service-type-not-found.exception';

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

    if (exception instanceof InvalidFileTypeException)
      return this.sendErrorResponse(resp, HttpStatus.BAD_REQUEST, message);

    if (exception instanceof FolderIsNotEmptyException)
      return this.sendErrorResponse(resp, HttpStatus.BAD_REQUEST, message);

    if (exception instanceof FolderNotFoundException)
      return this.sendErrorResponse(resp, HttpStatus.NOT_FOUND, message);

    if (exception instanceof ServiceTypeNotFoundException)
      return this.sendErrorResponse(resp, HttpStatus.NOT_FOUND, message);

    if (exception instanceof FolderAlreadyExistsException)
      return this.sendErrorResponse(resp, HttpStatus.CONFLICT, message);

    if (exception instanceof MediaNotFoundException)
      return this.sendErrorResponse(resp, HttpStatus.NOT_FOUND, message);

    if (exception instanceof ImagesNotUploadedException)
      return this.sendErrorResponse(resp, HttpStatus.NOT_FOUND, message);

    if (exception instanceof VideoNotUploadedException)
      return this.sendErrorResponse(resp, HttpStatus.NOT_FOUND, message);
  }

  private sendErrorResponse(resp: Response, status: number, message: string) {
    return resp.status(status).send({ status, message });
  }
}
