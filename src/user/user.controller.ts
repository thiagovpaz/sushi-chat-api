import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { UserService } from '@/user/user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/chats')
  getJoinedRooms(@AuthUser() userId: string) {
    return this.userService.getUser(userId);
  }
}
