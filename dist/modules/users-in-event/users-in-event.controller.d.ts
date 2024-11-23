import { HttpStatus } from '@nestjs/common';
import { UsersInEventService } from './users-in-event.service';
export declare class UsersInEventController {
    private readonly usersInEventService;
    constructor(usersInEventService: UsersInEventService);
    getUsersInEvent(eventId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            email: string;
            password: string;
            birthDate: Date;
            firstName: string;
            lastName: string;
        }[];
    }>;
    getEventsForUser(userId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            password: string;
            plannedDate: Date;
        }[];
    }>;
}
