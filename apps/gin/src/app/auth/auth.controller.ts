import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import type { Request as Req } from 'express';

import { Public } from './decorators/public.decorator';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  @Public()
  @UseGuards(LoginGuard)
  public login() {
    return { message: 'Welcome to the wonderful world of being logged in!' };
  }

  @Get('user')
  public user(@Request() req) {
    return { message: `Welcome back ${req.user.username}` };
  }
}
