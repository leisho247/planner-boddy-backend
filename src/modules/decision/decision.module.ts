import { Module } from '@nestjs/common';
import { DecisionController } from './decision.controller';
import { DecisionService } from './decision.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DecisionController],
  providers: [DecisionService, PrismaService],
})
export class DecisionModule {}
