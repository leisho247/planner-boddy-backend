import { Module } from '@nestjs/common';
import { AIModule } from './modules/ai/ai.module'; 
import { PrismaService } from './prisma/prisma.service';
import { DislikedMovieModule } from './modules/disliked-movie/disliked-movie.module';
import { LikedMealModule } from './modules/liked-meal/liked-meal.module';
import { UsersModule } from './modules/users/users.module';
import { MovieModule } from './modules/movies/movie.module';
import { PlacesModule } from './modules/places/places.module';

@Module({
  imports: [AIModule, DislikedMovieModule, LikedMealModule, MovieModule, UsersModule, PlacesModule],
  providers: [PrismaService]
})
export class AppModule {}
