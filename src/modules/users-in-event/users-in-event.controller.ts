import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersInEventService } from './users-in-event.service';

@Controller('users-in-event')
export class UsersInEventController {
  constructor(private readonly usersInEventService: UsersInEventService) {}

  @Get('event/:eventId')
  async getUsersInEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    try {
      const users = await this.usersInEventService.getUsersInEvent(eventId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Users in event retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  async getEventsForUser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const events = await this.usersInEventService.getEventsForUser(userId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Events for user retrieved successfully',
        data: events,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
