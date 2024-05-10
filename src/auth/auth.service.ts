import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SigninCredentialsDto } from '@/auth/dto/signin-credentials.dto';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '@/user/user.service';
import { Hash } from '@/common/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(signupCredentialsDto: SignupCredentialsDto) {
    const user = await this.userService.createUser(signupCredentialsDto);
    const token = this.generateToken(user.id);

    return { user, token };
  }

  async signin({ email, password }: SigninCredentialsDto) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = Hash.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user.id);
    return { user, token };
  }

  generateToken(userId: string) {
    const payload: JwtPayload = { userId };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verify<JwtPayload>(token);
  }
}
