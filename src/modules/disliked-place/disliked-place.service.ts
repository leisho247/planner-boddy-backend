import { Injectable } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';
import { CreateDislikedPlaceDto } from './dto/create-disliked-place.dto';

@Injectable()
export class DislikedPlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async addDislikedPlace(createDislikedPlaceDto: CreateDislikedPlaceDto) {
    return this.prisma.usersDislikedPlaces.create({
      data: createDislikedPlaceDto as any,
    });
  }

  async getDislikedPlace(id: number) {
    return this.prisma.usersDislikedPlaces.findUnique({
      where: { id },
    });
  }
}
