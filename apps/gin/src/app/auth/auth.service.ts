import { ConflictException, Injectable } from '@nestjs/common';
import { UserWhereUniqueInput } from '@prisma/client';
import { compare, hash } from 'bcrypt';

import { PrismaService } from '../core/prisma.service';

import { RegisterDTO } from './models/dtos';
import type { IActiveUser } from './models/interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly salt = 3;

  public async findUser(
    where: UserWhereUniqueInput
  ): Promise<IActiveUser | null> {
    return this.prisma.user.findOne({
      where,
    });
  }

  public async register({
    username,
    password,
  }: RegisterDTO): Promise<IActiveUser> {
    const existingUser = await this.prisma.user.findOne({
      where: { username },
    });

    if (existingUser !== null)
      throw new ConflictException('A user with that username already exists');

    return this.prisma.user.create({
      data: { username, password: await hash(password, this.salt) },
      select: { id: true, username: true },
    });
  }

  public async validateUser(
    username: string,
    password: string
  ): Promise<IActiveUser | null> {
    const user = await this.prisma.user.findOne({
      where: { username },
    });

    if (user?.password && (await compare(password, user.password))) {
      const { password: _discarded, ...userData } = user;

      return userData;
    }

    return null;
  }
}
