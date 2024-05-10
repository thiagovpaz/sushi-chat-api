import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormConfig from './config/typeorm.config';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';
import { ChatModule } from '@/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    AuthModule,
    UserModule,
    ChatModule,
  ],
  controllers: [],
})
export class AppModule {}
