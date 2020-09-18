import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { ActiveUser } from '../models/active-user';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext):ActiveUser => {
    const { user } = context.switchToHttp().getRequest<Request>();
    if (!user) throw new ForbiddenException();
    return user as ActiveUser;
  }
);
