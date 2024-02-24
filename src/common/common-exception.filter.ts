import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let data = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;

      if (
        exception.getResponse() &&
        typeof exception.getResponse() === 'object'
      ) {
        data = exception.getResponse()['errors'] || null;
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      data,
      meta: {},
    });
  }
}
