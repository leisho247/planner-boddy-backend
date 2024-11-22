import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { PrismaService } from 'src/prisma/prisma.service'; // Importa el servicio de Prisma

@Injectable()
export class AIService {
  private openai: OpenAIApi;

  constructor(private prisma: PrismaService) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getRecommendations(eventId: string, category: string): Promise<string> {
    let likedItems = [];
    let dislikedItems = [];

    if (category === 'movies') {
      likedItems = await this.prisma.usersLikedMovies.findMany({
        where: { eventId },
      });
      dislikedItems = await this.prisma.usersDislikedMovies.findMany({
        where: { eventId },
      });
    } else if (category === 'places') {
      likedItems = await this.prisma.usersLikedPlaces.findMany({
        where: { eventId },
      });
      dislikedItems = await this.prisma.usersDislikedPlaces.findMany({
        where: { eventId },
      });
    } else if (category === 'meals') {
      likedItems = await this.prisma.usersLikedMeals.findMany({
        where: { eventId },
      });
      dislikedItems = await this.prisma.usersDislikedMeals.findMany({
        where: { eventId },
      });
    }

    const likedNames = likedItems.map((item) => item.name).join(', ');
    const dislikedNames = dislikedItems.map((item) => item.name).join(', ');

    const prompt = `Here are some ${category} that people liked: ${likedNames}. Here are some that they disliked: ${dislikedNames}. Can you recommend similar ${category} to the liked ones but different from the disliked ones?`;

    try {
      const gptResponse = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 150,
      });

      return gptResponse.data.choices[0].text.trim();
    } catch (error) {
      throw new HttpException(
        'Error generating recommendations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
