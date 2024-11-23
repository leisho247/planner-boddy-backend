import PrismaService from 'src/prisma/prisma.service';
export declare class LikedMealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAsLiked(mealId: number, userId: number, eventId: number): Promise<any>;
    getLikedMeals(userId: number, eventId: number): Promise<any>;
    getMostLikedMeals(eventId: number): Promise<any>;
}
