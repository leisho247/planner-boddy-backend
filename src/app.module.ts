import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DislikedMovieModule } from './modules/disliked-movie/disliked-movie.module';
import { LikedMealModule } from './modules/liked-meal/liked-meal.module';
import { MovieModule } from './modules/movies/movie.module';
import { PlacesModule } from './modules/places/places.module';
import { UsersInEventModule } from './modules/users-in-event/users-in-event.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [ 
  ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig],
  }),
  DislikedMovieModule, LikedMealModule, MovieModule, PlacesModule, UsersInEventModule],
  providers: [PrismaService]
})
export class AppModule {}
