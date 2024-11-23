import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';


@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async getMovies() {
    try {
      const movies = await this.prisma.movie.findMany({
        select: {
          id: true,
          title: true,
          urlImage: true, // Incluye la imagen si está disponible
        },
      });

      return movies;
    } catch (error) {
      throw new Error('Error fetching movies');
    }
  }
}