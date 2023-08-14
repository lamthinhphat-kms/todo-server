import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  error(message: any, trace?: string, context?: string) {
    super.error(message, trace);
  }

  warn(message: any, context?: string) {
    super.warn(message);
  }

  log(message: any, context?: string) {
    super.log(message);
  }

  debug(message: any, context?: string) {
    super.debug(message);
  }

  verbose(message: any, context?: string) {
    super.verbose(message);
  }
}
