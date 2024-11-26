import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeMovieDto } from './create-like-movie.dto';

export class UpdateLikeMovieDto extends PartialType(CreateLikeMovieDto) {
  title?: string;
  description?: string;
}
