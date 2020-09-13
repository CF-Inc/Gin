import { Exclude, Expose } from 'class-transformer';
import { IsNotIn, IsString, Length } from 'class-validator';

const COMMON_PASSWORDS = ['password', 'password1'];

@Exclude()
export class RegisterDTO {
  @Expose()
  @IsString()
  @Length(8, 64)
  @IsNotIn(COMMON_PASSWORDS, {
    message: 'Your password sucks. Make a new one.',
  })
  public password!: string;

  @Expose()
  @IsString()
  @Length(5, 20)
  public username!: string;
}
