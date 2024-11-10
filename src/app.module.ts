import { Module } from '@nestjs/common';
import { AIModule } from './modules/ai/ai.module'; 

@Module({
  imports: [AIModule],
})
export class AppModule {}
