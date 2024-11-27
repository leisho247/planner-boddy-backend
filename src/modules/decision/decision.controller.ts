import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import { DecisionService } from './decision.service';
import { CreateDecisionDto } from './dto/create-decision.dto';

@Controller('decision')
export class DecisionController {
  constructor(private readonly decisionService: DecisionService) {}

  @Post('create')
  async createDecision(@Body() createDecisionDto: CreateDecisionDto) {
    const decision =
      await this.decisionService.createDecision(createDecisionDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Decision created successfully.',
      data: decision,
    };
  }

  @Get(':id')
  async getDecision(@Param('id') id: string) {
    const decision = await this.decisionService.getDecision(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Decision retrieved successfully.',
      data: decision,
    };
  }
}
