import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Redirect,
  Session,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { LoginGuard } from './guards/login.guard';
import { RegisterDTO } from './models/dtos';
import type { IActiveUser } from './models/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LoginGuard)
  public login(): { message: string } {
    return { message: 'Welcome to the wonderful world of being logged in!' };
  }

  @Post('logout')
  public async logout(@Session() session: Express.Session): Promise<void> {
    try {
      await new Promise((resolve, reject) =>
        session.destroy((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      );
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Post('register')
  @Redirect('login', 308)
  public async register(@Body() data: RegisterDTO): Promise<void> {
    await this.service.register(data);
  }

  @Get('user')
  public user(@User() user: IActiveUser): IActiveUser {
    return user;
  }
}
