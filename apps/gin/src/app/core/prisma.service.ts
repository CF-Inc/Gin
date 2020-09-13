import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnApplicationBootstrap, OnApplicationShutdown {
  @Override()
  public async onApplicationBootstrap(): Promise<void> {
    await this.$connect();
  }

  @Override()
  public async onApplicationShutdown(): Promise<void> {
    await this.$disconnect();
  }
}
