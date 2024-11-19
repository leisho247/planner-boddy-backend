import { Module } from '@nestjs/common';
import { AIModule } from './modules/ai/ai.module'; 
import { PrismaService } from './prisma/prisma.service';
import { DislikedMovieModule } from './modules/disliked-movie/disliked-movie.module';

@Module({
  imports: [AIModule, DislikedMovieModule],
  providers: [PrismaService]
})
export class AppModule {}
