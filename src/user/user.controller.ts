import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { UserService } from '@/user/user.service';
import { instanceToInstance } from 'class-transformer';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/chats')
  getJoinedRooms(@AuthUser() userId: string) {
    return instanceToInstance(this.userService.getUser(userId));
  }
}
