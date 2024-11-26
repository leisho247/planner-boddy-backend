import { Module } from '@nestjs/common';
import { DecisionController } from './decision.controller';
import { DecisionService } from './decision.service';
import { DicisionController } from './dicision/dicision.controller';
import  PrismaService  from 'prisma/prisma.service';

@Module({
  controllers: [DecisionController, DicisionController],
  providers: [DecisionService, PrismaService],
})
export class DecisionModule {}
