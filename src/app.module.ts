import { Module } from '@nestjs/common';
import { AIModule } from './modules/ai/ai.module'; 
import { PrismaService } from './prisma/prisma.service';
import { DislikedMovieModule } from './modules/disliked-movie/disliked-movie.module';
import { LikedMealModule } from './modules/liked-meal/liked-meal.module';
import { MovieModule } from './modules/movies/movie.module';

@Module({
  imports: [AIModule, DislikedMovieModule, LikedMealModule, MovieModule],
  providers: [PrismaService]
})
export class AppModule {}
