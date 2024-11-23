import PrismaService from 'src/prisma/prisma.service';
export declare class LikedMealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAsLiked(mealId: number, userId: number, eventId: number): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        eventId: number;
        mealId: number;
    }>;
    getLikedMeals(userId: number, eventId: number): Promise<{
        userId: number;
        eventId: number;
        mealId: number;
    }[]>;
    getMostLikedMeals(eventId: number): Promise<{
        mealId: number;
        title: string;
        urlImage: string;
        likes: number;
    }[]>;
}
