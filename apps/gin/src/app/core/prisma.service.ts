import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnApplicationBootstrap, OnApplicationShutdown {
  public async onApplicationBootstrap(): Promise<void> {
    await this.$connect();
  }

  public async onApplicationShutdown(): Promise<void> {
    await this.$disconnect();
  }
}
