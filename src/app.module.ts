import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { DislikedMealModule } from './modules/disliked-meal/disliked-meal.module';
import { LikePlaceModule } from './modules/like-place/like-place.module';
import { LikeMovieModule } from './modules/like-movie/like-movie.module';
import { LikedMealModule } from './modules/liked-meal/liked-meal.module';
import { MovieModule } from './modules/movies/movie.module';
import { PlacesModule } from './modules/places/places.module';
import { UsersInEventModule } from './modules/users-in-event/users-in-event.module';
import PrismaService from './prisma/prisma.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    ,
    DislikedMealModule,
    LikePlaceModule,
    LikeMovieModule,
    LikedMealModule,
    MovieModule,
    PlacesModule,
    UsersInEventModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
