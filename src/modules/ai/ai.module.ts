import { Module } from '@nestjs/common';
import { AIController } from './controllers/ai.controller';
import { AIService } from './services/ai.services'; 
import { PrismaService } from '../prisma/prisma.service';  // Asegúrate de tener configurado el servicio de Prisma

@Module({
  controllers: [AIController],
  providers: [AIService, PrismaService],
})
export class AIModule {}