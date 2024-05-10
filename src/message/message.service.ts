import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  getMessages({ roomId }: GetMessagesDto) {
    return this.messageRepository.find({
      where: { room: { id: roomId } },
      order: {
        created_at: 'ASC',
      },
    });
  }

  async createMessage({ content, roomId }: CreateMessageDto, userId: string) {
    const message = this.messageRepository.create({
      content,
      owner: { id: userId },
      room: { id: roomId },
    });

    await this.messageRepository.save(message);

    return this.messageRepository.findOneBy({ id: message.id });
  }
}
