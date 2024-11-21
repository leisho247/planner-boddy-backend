import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class CreateLikePlaceDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  placeId: number;

  @IsString()
  @IsNotEmpty()
  likedAt: string; // Puede ser un ISO Date string.
}
