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
import PrismaService from '../prisma/prisma.service';
import { DislikedMovieModule } from './modules/disliked-movie/disliked-movie.module';
import { MealModule } from './modules/meal/meal.module';
import { UserModule } from './modules/user/user.module';
import { DislikedPlaceModule } from './modules/disliked-place/disliked-place.module';
import { EventModule } from './modules/event/event.module';
import { MealService } from './meal/meal.service';
import { MealController } from './meal/meal.controller';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DislikedMealModule,
    LikePlaceModule,
    LikeMovieModule,
    LikedMealModule,
    MovieModule,
    PlacesModule,
    UsersInEventModule,
    DislikedMovieModule,
    MealModule,
    UserModule,
    DislikedPlaceModule,
    EventModule,
    ChatModule,
  ],
  providers: [PrismaService, MealService],
  controllers: [MealController],
})
export class AppModule {}
