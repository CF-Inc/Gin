import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import type { IActiveUser } from '../models/interfaces';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly auth: AuthService) {
    super();
  }

  @Override()
  public async deserializeUser(
    id: string,
    done: CallableFunction
  ): Promise<void> {
    const user = await this.auth.findUser({ id });
    done(undefined, user);
  }

  @Override()
  public serializeUser(user: IActiveUser, done: CallableFunction): void {
    done(undefined, user.id);
  }
}
