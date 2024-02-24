import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CommonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const message = 'Success';
        const meta = {};

        if (!data) {
          return {
            statusCode,
            message,
            data: '',
            meta,
          };
        }

        return {
          statusCode,
          message,
          data,
          meta,
        };
      }),
    );
  }
}
