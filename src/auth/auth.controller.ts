import { Body, Controller, Post } from '@nestjs/common';
import { instanceToInstance, instanceToPlain } from 'class-transformer';

import { AuthService } from './auth.service';
import { AuthResponse } from './interfaces/auth-response.interface';
import { SignupCredentialsDto } from '@/auth/dto/signup-credentials.dto';
import { SigninCredentialsDto } from '@/auth/dto/signin-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body() signupCredentialsDto: SignupCredentialsDto,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body() signinCredentialsDto: SigninCredentialsDto,
  ): Promise<AuthResponse> {
    return instanceToInstance(this.authService.signin(signinCredentialsDto));
  }
}
