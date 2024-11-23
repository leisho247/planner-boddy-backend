import { LikedMealService } from './liked-meal.service';
export declare class LikedMealController {
    private readonly likedMealService;
    constructor(likedMealService: LikedMealService);
    markAsLiked(body: {
        itemId: number;
        userId: number;
        eventId: number;
    }): Promise<any>;
    getLikedMeals(userId: string, eventId: string): Promise<any>;
    getMostLikedMeals(eventId: string): Promise<any>;
}
