import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignupCredentialsDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
