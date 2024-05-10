import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResponse } from './interfaces/auth-response.interface';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body() signupCredentialsDto: SignupCredentialsDto,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupCredentialsDto);
  }
}
