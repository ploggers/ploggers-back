import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { Badges } from 'src/entities/Badges';
import { Crews } from 'src/entities/Crews';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { Locations } from 'src/entities/Locations';
import { Users } from 'src/entities/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articles,
      Badges,
      Crews,
      Users,
      Events,
      Follows,
      Locations,
    ]),
  ],
  providers: [FollowsService],
  controllers: [FollowsController],
})
export class FollowsModule {}
