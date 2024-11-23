import { Injectable } from '@nestjs/common';
import  PrismaService  from 'prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto as any,
    });
  }

  async getEvent(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }
}
