import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrewBadges } from 'src/entities/Crew.Badges';
import { Crews } from 'src/entities/Crews';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class CrewsService {
  constructor(
    @InjectRepository(Crews)
    private crewRepository: Repository<Crews>,

    @InjectRepository(CrewBadges)
    private crewBadgeRepository: Repository<CrewBadges>,
  ) {}

  async getCrewInfo(crewId: number) {
    return await this.crewRepository.findOne({
      where: { id: crewId },
    });
  }

  async getAllCrewRanking() {
    return await this.crewRepository.find({
      order: { crewScore: 'DESC' },
    });
  }

  async getSchoolRanking() {
    const query = createQueryBuilder('crews')
      .select('SUM(crews.crewScore)', 'sum_crewScore')
      .groupBy('crews.school')
      .orderBy('crews.crewScore', 'DESC');

    const result = await query.getMany();
    return result;
  }

  async getCrewBadgesCount(crewId: number) {
    const query = createQueryBuilder('crew_badges')
      .select('COUNT(*) AS badgeCount')
      .where('crew_badges.CrewId = :crewId', { crewId });

    const result = await query.getOne();
    return result;
  }

  async getCrewBadges(crewId: number) {
    return await this.crewBadgeRepository.find({
      where: { CrewId: crewId },
    });
  }
}
