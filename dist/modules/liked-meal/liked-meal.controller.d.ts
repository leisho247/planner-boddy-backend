import { LikedMealService } from './liked-meal.service';
export declare class LikedMealController {
    private readonly likedMealService;
    constructor(likedMealService: LikedMealService);
    markAsLiked(body: {
        itemId: number;
        userId: number;
        eventId: number;
    }): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        eventId: number;
        mealId: number;
    }>;
    getLikedMeals(userId: string, eventId: string): Promise<{
        userId: number;
        eventId: number;
        mealId: number;
    }[]>;
    getMostLikedMeals(eventId: string): Promise<{
        mealId: number;
        title: string;
        urlImage: string;
        likes: number;
    }[]>;
}
