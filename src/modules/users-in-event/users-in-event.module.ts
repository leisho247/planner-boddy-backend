import { Module } from '@nestjs/common';
import { UsersInEventController } from './users-in-event.controller';
import { UsersInEventService } from './users-in-event.service';

@Module({
  controllers: [UsersInEventController],
  providers: [UsersInEventService],
})
export class UsersInEventModule {}