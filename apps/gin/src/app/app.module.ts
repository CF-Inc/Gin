import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/prisma.module';
import { LobbyController } from './lobby/lobby.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController, LobbyController],
  providers: [AppService],
})
export class AppModule {}
