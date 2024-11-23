import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import databaseConfig from './config/database.config';
import { DislikedMealModule } from './modules/disliked-meal/disliked-meal.module';
import { LikePlaceModule } from './modules/like-place/like-place.module';
import { LikeMovieModule } from './modules/like-movie/like-movie.module';

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
  ],
  providers: [PrismaService],
})
export class AppModule {}
