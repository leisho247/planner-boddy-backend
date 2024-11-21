import { Controller, Get, Param, Body } from '@nestjs/common';
import { AIService } from '../services/ai.services';

@Controller('aicontroller')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Get(':eventId')
  async getRecommendations(
    @Param('eventId') eventId: string,
    @Body('category') category: string,
  ) {
    const recommendations = await this.aiService.getRecommendations(eventId, category);
    return { recommendations };
  }
}