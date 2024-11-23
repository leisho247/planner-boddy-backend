import { Module } from '@nestjs/common';
import { DislikedMovieController } from './disliked-movie.controller';
import { DislikedMovieService } from './disliked-movie.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DislikedMovieController],
  providers: [DislikedMovieService, PrismaService],
})
export class DislikedMovieModule {}