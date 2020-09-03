import { Exclude, Expose } from 'class-transformer';
import { IsString, Length, IsNotIn, Matches } from 'class-validator';

const COMMON_PASSWORDS = ['password', 'password1'];

@Exclude()
export class RegisterDTO {
  @Expose()
  @IsString()
  @Length(5, 20)
  username: string;

  @Expose()
  @IsString()
  @Length(8, 64)
  @IsNotIn(COMMON_PASSWORDS, {
    message: 'Your password sucks. Make a new one.',
  })
  password: string;
}
