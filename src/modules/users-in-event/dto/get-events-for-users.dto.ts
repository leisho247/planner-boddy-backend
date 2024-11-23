import { IsInt, Min } from 'class-validator';

export class GetEventsForUserDto {
  @IsInt({ message: 'The userId must be an integer.' })
  @Min(1, { message: 'The userId must be a positive number.' })
  userId: number;
}
