import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class LocalGuard extends AuthGuard('local') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  @Override()
  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    const request = context.switchToHttp().getRequest<Request>();

    return isPublic || request.isAuthenticated();
  }
}
