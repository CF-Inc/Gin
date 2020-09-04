import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

let replaceMe: any;

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  @Override()
  public deserializeUser(_userId: string, done: CallableFunction): void {
    done(undefined, replaceMe);
  }

  @Override()
  public serializeUser(user: any, done: CallableFunction): void {
    replaceMe = user;
    done(undefined, 0);
  }
}
