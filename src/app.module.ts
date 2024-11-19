import { Module } from '@nestjs/common';
import { AIModule } from './modules/ai/ai.module'; 
import { PrismaService } from './prisma/prisma.service';
import { DislikedMovieModule } from './modules/disliked-movie/disliked-movie.module';
import { LikedMealModule } from './modules/liked-meal/liked-meal.module';
import { MovieModule } from './modules/movies/movie.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AIModule, DislikedMovieModule, LikedMealModule, MovieModule, UsersModule],
  providers: [PrismaService]
})
export class AppModule {}
