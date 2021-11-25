import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Articles } from './src/entities/Articles';
import { Badges } from './src/entities/Badges';
import { Crews } from 'src/entities/Crews';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { Locations } from 'src/entities/Locations';
import { Manages } from 'src/entities/Manages';
import { Users } from './src/entities/Users';
import { JoinRequests } from './src/entities/Join.Requests';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Articles,
    Badges,
    Crews,
    Users,
    Events,
    Follows,
    Manages,
    Locations,
    JoinRequests,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  // autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false, // 서버 첫 시작일 때만 true
  logging: true,
  keepConnectionAlive: true,
  timezone: 'Asia/Seoul',
};

export = config;
