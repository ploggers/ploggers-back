import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Articles } from 'src/entities/Articles';
import { Badges } from 'src/entities/Badges';
import { Crews } from 'src/entities/Crews';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { Locations } from 'src/entities/Locations';
import { Manages } from 'src/entities/Manages';
import { Users } from 'src/entities/Users';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articles,
      Badges,
      Crews,
      Locations,
      Manages,
      Users,
      Events,
      Follows,
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
