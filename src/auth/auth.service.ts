import { Injectable } from '@nestjs/common';

import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signupCredentialsDto: SignupCredentialsDto) {
    const user = await this.userService.createUser(signupCredentialsDto);
    return { user, token: 'null' };
  }
}
