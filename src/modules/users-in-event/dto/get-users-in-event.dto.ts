import { IsInt, Min } from 'class-validator';

export class GetUsersInEventDto {
  @IsInt({ message: 'The eventId must be an integer.' })
  @Min(1, { message: 'The eventId must be a positive number.' })
  eventId: number;
}
