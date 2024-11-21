import { Module } from '@nestjs/common';
import { LikeMovieService } from '../like-movie/services/like-movie.service';
import { LikeMovieController } from './controllers/like-movie.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [LikeMovieController],
  providers: [LikeMovieService, PrismaService],
})
export class LikeMovieModule {}
