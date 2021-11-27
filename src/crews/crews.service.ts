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
    return await this.crewRepository
      .createQueryBuilder('crews')
      .innerJoinAndSelect('crews.leader', 'leader')
      .innerJoinAndSelect('crews.location', 'location')
      .where('crews.id = :crewId', { crewId })
      .getMany();
  }

  async createCrew(crew: any) {
    const newCrew = new Crews();
    newCrew.name = crew.name;
    newCrew.text = crew.text;
    // newCrew.location = crew.location;
    await this.crewRepository.save(newCrew);
  }

  async getAllCrewRanking() {
    return await this.crewRepository.find({
      order: { crewScore: 'DESC' },
    });
  }

  async getSchoolRanking() {
    const query = await createQueryBuilder('crews', 'c')
      .select('SUM(c.crewScore)', 'sumScore')
      .groupBy('c.school')
      .getMany();
    // .orderBy('c.crewScore', 'DESC');

    console.log(query);
    return query;
  }

  async getCrewBadgesCount(crewId: number) {
    return await this.crewBadgeRepository
      .createQueryBuilder('crew_badges')
      .innerJoin('crew_badges.crew', 'crew')
      .addSelect('COUNT(*) AS badgesCount')
      .where('crew.id = :crewId', { crewId })
      .groupBy('crew.id')
      .getOne();
  }
  // async getCrewInfo(crewId: number) {
  //   return await this.crewRepository
  //     .createQueryBuilder('crews')
  //     .innerJoinAndSelect('crews.leader', 'leader')
  //     .innerJoinAndSelect('crews.location', 'location')
  //     .where('crews.id = :crewId', { crewId })
  //     .getMany();
  // }

  async getCrewBadges(crewId: number) {
    return await this.crewBadgeRepository.find({
      where: { CrewId: crewId },
    });
  }

  async getCrewMembersCount(crewId: number) {
    return await this.crewBadgeRepository
      .createQueryBuilder('follows')
      .select('COUNT(*) AS memberCount')
      .where('follows.CrewId = :crewId', { crewId })
      .getOne();
  }
}
