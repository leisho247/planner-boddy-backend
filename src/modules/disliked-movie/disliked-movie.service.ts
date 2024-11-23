import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';


@Injectable()
export class DislikedMovieService {
  constructor(private readonly prisma: PrismaService) {}

  async markAsDisliked(movieId: number, userId: number, eventId: number) {
    try {
      const dislikedMovie = await this.prisma.usersDislikedMovies.create({
        data: {
          movieId,
          userId,
          eventId,
        },
      });
      return dislikedMovie;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'You already disliked this movie.',
          HttpStatus.OK,
        );
      }
      throw new HttpException(
        'Error creating disliked movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDislikedMovies(userId: number, eventId: number) {
    try {
      const dislikedMovies = await this.prisma.usersDislikedMovies.findMany({
        where: { eventId },
        select: {
          movieId: true,
          userId: true,
          eventId: true,
        },
      });
      return dislikedMovies;
    } catch (error) {
      throw new HttpException(
        'Error fetching disliked movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}