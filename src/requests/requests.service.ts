import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinRequests } from 'src/entities/Join.Requests';
import { Repository } from 'typeorm';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(JoinRequests)
    private joinRequestRepository: Repository<JoinRequests>,
  ) {}

  async joinRequest(crewId: number, userId: string) {
    return await this.joinRequestRepository.save({
      UserId: userId,
      CrewId: crewId,
    });
  }
}
