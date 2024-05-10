import { Repository } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { SignupCredentialsDto } from '@/auth/dto/signup-credentials.dto';
import { Hash } from '@/common/utils/hash.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  getUser(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['joinedRooms'],
    });
  }

  async createUser({ name, email, password }: SignupCredentialsDto) {
    const findUser = await this.getUserByEmail(email);

    if (findUser) {
      throw new ConflictException('Email already taken');
    }

    const hashedPassword = Hash.generateHash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}
