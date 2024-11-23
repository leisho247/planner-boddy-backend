import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { LikeMovieController } from './like-movie.controller';
import { LikeMovieService } from './like-movie.service';

@Module({
  controllers: [LikeMovieController],
  providers: [LikeMovieService, PrismaService],
})
export class LikeMovieModule {}
