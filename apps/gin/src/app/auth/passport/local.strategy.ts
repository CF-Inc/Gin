import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public async validate(username: string, password: string) {
    if (username === 'hush' && password === 'tuesday') {
      return { username: 'hush' };
    }
  }
}
