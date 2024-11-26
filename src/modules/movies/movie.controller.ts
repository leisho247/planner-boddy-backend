import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies() {
    try {
      return await this.movieService.getMovies();
    } catch (error) {
      throw new HttpException(
        'Error fetching movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}