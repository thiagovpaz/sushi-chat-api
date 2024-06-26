import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from '@/auth/auth.service';
import { MessageService } from '@/message/message.service';
import { CreateMessageDto } from '@/message/dto/create-message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
  ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const payload = this.authService.verifyToken(token);

    if (!payload) {
      client.disconnect(true);
    } else {
      console.log(`Client ${client.id} connected. Auth token: ${token}`);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, roomId: number) {
    console.log(`Client ${client.id} joined room: ${roomId}`);
    client.join(roomId.toString());
    return roomId;
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, roomId: number) {
    console.log(`Client ${client.id} leaved room: ${roomId}`);
    client.leave(roomId.toString());
    return roomId;
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: any) {
    console.log(
      `Client ${client.id} sent message: ${data.content} to room: ${data.room_id}`,
    );
    const message = await this.messageService.createMessage(
      { content: data.content, roomId: data.room_id },
      data.owner.id,
    );

    client.emit('message', message);
    client.to(data.room_id).emit('message', message);
  }

  @SubscribeMessage('isTyping')
  async handleTypingNotification(
    client: Socket,
    { roomId, username }: { roomId: string; username: string },
  ) {
    console.log(`Client ${client.id} typing message to room: ${roomId}`);
    client.to(roomId).emit('isTyping', `${username} typing message...`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }
}
