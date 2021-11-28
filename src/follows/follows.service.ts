import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follows } from 'src/entities/Follows';
import { Repository } from 'typeorm';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followRepository: Repository<Follows>,
  ) {}

  async registerCrew(crewId: string, userId: string) {
    return await this.followRepository.save({
      CrewId: crewId,
      UserId: userId,
    });
  }

  async getMyCrews(UserId: string) {
    return this.followRepository.find({
      where: { UserId },
      select: ['CrewId', 'createdAt', 'updatedAt', 'deletedAt'],
    });
  }

  async unregisterCrew(CrewId: string, UserId: string) {
    this.followRepository.delete({
      CrewId: CrewId,
      UserId: UserId,
    });
  }
}
