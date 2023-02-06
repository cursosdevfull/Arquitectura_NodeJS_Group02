import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ipsAllowed = ['192.168.4.20', '200.15-56.32'];

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const ip =
      request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    if (!ipsAllowed.includes(ip)) {
      return response.status(403).send('Forbidden');
    }

    return next.handle();
  }
}
