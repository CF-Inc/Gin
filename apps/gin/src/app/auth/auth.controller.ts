import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import type { Request as Req } from 'express';

import { Public } from './decorators/public.decorator';
import { LoginGuard } from './guards/login.guard';
import { PrismaService } from '../core/prisma.service';
import { RegisterDTO } from './models/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Post('register')
  public async register(@Body() data: RegisterDTO) {
    return this.prisma.user.create({
      data,
      select: { id: true, username: true },
    });
  }

  @Public()
  @Post('login')
  @UseGuards(LoginGuard)
  public login() {
    return { message: 'Welcome to the wonderful world of being logged in!' };
  }

  @Get('user')
  public user(@Request() req) {
    return { message: `Welcome back ${req.user.username}` };
  }
}
