import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrewBadges } from 'src/entities/Crew.Badges';
import { Crews } from 'src/entities/Crews';
import { Follows } from 'src/entities/Follows';
import { Locations } from 'src/entities/Locations';
import { Users } from 'src/entities/Users';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class CrewsService {
  constructor(
    @InjectRepository(Crews)
    private crewRepository: Repository<Crews>,

    @InjectRepository(CrewBadges)
    private crewBadgeRepository: Repository<CrewBadges>,

    @InjectRepository(Follows) private followsRepository: Repository<Follows>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Locations)
    private locationsRepository: Repository<Locations>,
  ) {}

  async getCrewInfo(crewId: string) {
    return await this.crewRepository
      .createQueryBuilder('crews')
      .innerJoinAndSelect('crews.Leader', 'leader')
      .innerJoinAndSelect('crews.Location', 'location')
      .where('crews.id = :crewId', { crewId })
      .getMany();
  }

  async createCrew(crew: any, userId: any) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const location = await this.locationsRepository.findOne({
      where: { dongCd: crew.location },
    });
    const newCrew = new Crews();
    newCrew.name = crew.name;
    newCrew.text = crew.text;
    newCrew.Leader = user;
    newCrew.Location = location;
    const crewId = (await this.crewRepository.save(newCrew)).id;

    const newFollow = new Follows();
    newFollow.CrewId = crewId;
    newFollow.UserId = userId;
    await this.followsRepository.save(newFollow);
  }

  async getAllCrewRanking() {
    return await this.crewRepository.find({
      order: { crewScore: 'DESC' },
    });
  }

  async getSchoolRanking() {
    return await this.crewRepository
      .createQueryBuilder('crews')
      .select('crews.school')
      .addSelect('SUM(crews.crewScore)', 'schoolScore')
      .groupBy('crews.school')
      .orderBy('schoolScore', 'DESC')
      .getRawMany();
  }

  async getCrewBadgesCount(crewId: string) {
    return await this.crewBadgeRepository
      .createQueryBuilder('crew_badges')
      .innerJoin('crew_badges.crew', 'crew')
      .addSelect('COUNT(*) AS badgesCount')
      .where('crew.id = :crewId', { crewId })
      .groupBy('crew.id')
      .getRawOne();
  }

  async getCrewBadges(crewId: string) {
    return await this.crewBadgeRepository.find({
      where: { CrewId: crewId },
    });
  }

  async getCrewMembersCount(crewId: string) {
    return await this.crewBadgeRepository
      .createQueryBuilder('follows')
      .select('COUNT(*) AS memberCount')
      .where('follows.CrewId = :crewId', { crewId })
      .getOne();
  }
}
