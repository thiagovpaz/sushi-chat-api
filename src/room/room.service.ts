import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsDto } from './dto/get-rooms.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  getRooms(_: GetRoomsDto) {
    return this.roomRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  getRoom(id: string) {
    return this.roomRepository.findOneBy({ id });
  }

  async createRoom({ title, description }: CreateRoomDto, userId: string) {
    const room = this.roomRepository.create({
      title: title,
      description: description,
      owner: { id: userId },
    });
    return await this.roomRepository.save(room);
  }

  async deleteRoom(id: string, userId: string) {
    const result = await this.roomRepository.delete({
      id,
      owner: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
  }
}
