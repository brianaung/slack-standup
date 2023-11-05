import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { StandupEntity } from './src/standup/standup.entity';
import { UserEntity } from './src/user/user.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: 'password',
  // database: 'standup-board-db',
  synchronize: false,
  dropSchema: false,
  logging: false,
  entities: [StandupEntity, UserEntity],
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['./dist/migrations/*.js'],
};

export const dataSource = new DataSource(ormConfig as DataSourceOptions);
