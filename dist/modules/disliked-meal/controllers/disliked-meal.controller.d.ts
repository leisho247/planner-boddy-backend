import { DislikedMealService } from '../services/disliked-meal.service';
import { CreateDislikedMealDto } from '../dto/create-disliked-meal.dto';
export declare class DislikedMealController {
    private readonly dislikedMealService;
    constructor(dislikedMealService: DislikedMealService);
    create(createDislikedMealDto: CreateDislikedMealDto): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
