import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';

import { Public } from './decorators/public.decorator';
import { LoginGuard } from './guards/login.guard';
import { RegisterDTO } from './models/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Post('login')
  @UseGuards(LoginGuard)
  public login(): { message: string } {
    return { message: 'Welcome to the wonderful world of being logged in!' };
  }

  @Public()
  @Post('register')
  public async register(
    @Body() data: RegisterDTO
  ): Promise<Pick<User, 'id' | 'username'>> {
    return this.prisma.user.create({
      data,
      select: { id: true, username: true },
    });
  }

  @Get('user')
  public user(@Request() req: any): { message: string } {
    return { message: `Welcome back ${req.user.username}` };
  }
}
