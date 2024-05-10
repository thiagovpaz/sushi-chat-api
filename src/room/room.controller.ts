import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { GetRoomsDto } from './dto/get-rooms.dto';

@Controller('rooms')
@ApiTags('Rooms')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getRooms(getRoomsDto: GetRoomsDto) {
    return this.roomService.getRooms(getRoomsDto);
  }

  @Get(':id')
  getRoom(@Param('id') id: string) {
    return this.roomService.getRoom(id);
  }

  @Post()
  createRoom(@AuthUser() userId: string, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto, userId);
  }

  @Delete(':id')
  deleteRoom(@AuthUser() userId: string, @Param('id') id: string) {
    return this.roomService.deleteRoom(id, userId);
  }
}
