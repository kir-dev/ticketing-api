import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticatedGuard.name)

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    this.logger.debug(`user:`, Object.keys(request))
    this.logger.debug(`asd:`, typeof request.isAuthenticated)
    return request.isAuthenticated()
  }
}
