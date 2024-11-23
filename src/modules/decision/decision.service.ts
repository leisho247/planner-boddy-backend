import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDecisionDto } from './dto/create-decision.dto';

@Injectable()
export class DecisionService {
  constructor(private readonly prisma: PrismaService) {}

  async createDecision(createDecisionDto: CreateDecisionDto) {
    return this.prisma.decision.create({
      data: createDecisionDto,
    });
  }

  async getDecision(id: number) {
    return this.prisma.decision.findUnique({
      where: { id },
    });
  }
}
