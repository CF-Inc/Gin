import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { LocalStrategy } from './passport/local.strategy';
import { UserSerializer } from './passport/user.serializer';
import { LocalGuard } from './guards/local.guard';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    UserSerializer,
    {
      provide: APP_GUARD,
      useClass: LocalGuard,
    },
  ],
})
export class AuthModule {}
