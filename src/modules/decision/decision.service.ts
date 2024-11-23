import { Injectable } from '@nestjs/common';
import { CreateDecisionDto } from './dto/create-decision.dto';
import PrismaService from 'prisma/prisma.service';

@Injectable()
export class DecisionService {
  constructor(private readonly prisma: PrismaService) {}

  async createDecision(createDecisionDto: CreateDecisionDto) {
    return this.prisma.eventDecisions.create({
      data: createDecisionDto,
    });
  }

  async getDecision(id: number) {
    return this.prisma.eventDecisions.findUnique({
      where: { id },
    });
  }
}
