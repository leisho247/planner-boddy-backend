import { HttpStatus } from '@nestjs/common';
import { UsersInEventService } from './users-in-event.service';
export declare class UsersInEventController {
    private readonly usersInEventService;
    constructor(usersInEventService: UsersInEventService);
    getUsersInEvent(eventId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getEventsForUser(userId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
}
