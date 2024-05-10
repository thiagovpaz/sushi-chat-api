import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MessageService } from './message.service';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { instanceToInstance } from 'class-transformer';

@Controller('messages')
@ApiTags('Messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getMessages(@Query() getMessagesDto: GetMessagesDto) {
    return instanceToInstance(this.messageService.getMessages(getMessagesDto));
  }

  @Post()
  createMessages(
    @AuthUser() userId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return instanceToInstance(
      this.messageService.createMessage(createMessageDto, userId),
    );
  }
}
