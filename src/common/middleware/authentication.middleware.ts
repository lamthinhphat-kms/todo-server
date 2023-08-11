import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {}
}
