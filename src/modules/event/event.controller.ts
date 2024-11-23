import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    const event = await this.eventService.createEvent(createEventDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Event created successfully.',
      data: event,
    };
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    const event = await this.eventService.getEvent(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Event retrieved successfully.',
      data: event,
    };
  }
}
