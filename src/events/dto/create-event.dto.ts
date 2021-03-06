import { PickType } from '@nestjs/swagger';
import { Events } from 'src/entities/Events';

export class CreateEventDto extends PickType(Events, [
  'title',
  'date',
  'startTime',
  'endTime',
  'location',
  'text',
  'CrewId',
] as const) {}
