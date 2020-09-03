import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import type { Request } from 'express';

@Injectable()
export class LocalGuard extends AuthGuard('local') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    const request: Request = context.switchToHttp().getRequest();

    return isPublic || request.isAuthenticated();
  }
}
