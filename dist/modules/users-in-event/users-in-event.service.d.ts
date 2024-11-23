export declare class UsersInEventService {
    getUsersInEvent(eventId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        password: string;
        birthDate: Date;
        firstName: string;
        lastName: string;
    }[]>;
    getEventsForUser(userId: number): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        password: string;
        plannedDate: Date;
    }[]>;
}
