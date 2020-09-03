import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

let REPLACE_ME;

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  public serializeUser(user, done: CallableFunction) {
    REPLACE_ME = user;
    done(undefined, 0);
  }

  public async deserializeUser(userId: string, done: CallableFunction) {
    done(undefined, REPLACE_ME);
  }
}
