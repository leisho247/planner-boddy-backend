import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeMovieDto {
  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @IsInt()
  @IsNotEmpty()
  like: number;

  @IsString()
  @IsNotEmpty()
  LikedAt: string;
}
