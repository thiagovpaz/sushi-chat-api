import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: '_migrations',
  migrationsRun: true,
});
