import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async validate(username: string, password: string) {
    const user = await this.prisma.user.findOne({ where: { username } });

    if (user?.password === password) {
      const { password: _, ...paswordlessUser } = user;
      return paswordlessUser;
    }
  }
}
