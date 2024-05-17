import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MessageService } from './message.service';
import { AuthUser } from '@/common/decorators/auth-user.decorator';

@Controller('messages')
@ApiTags('Messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getMessages(@Query() getMessagesDto: GetMessagesDto) {
    return this.messageService.getMessages(getMessagesDto);
  }

  @Post()
  createMessages(
    @AuthUser() userId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessage(createMessageDto, userId);
  }
}
